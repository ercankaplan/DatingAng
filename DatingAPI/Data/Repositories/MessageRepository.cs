
using DatingAPI.Data;
using DatingAPI.DTOs;
using DatingAPI.Entities;
using DatingAPI.Helpers;
using DatingAPI.Interfaces.IRepositories;
using Microsoft.EntityFrameworkCore;

public class MessageRepository(AppDbContext context) : IMessageRepository
{
    private readonly AppDbContext _context = context;

    public async Task<bool> AddMessageAsync(Message message)
    {
        _context.Messages.Add(message);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteMessageAsync(Message message)
    {
        _context.Messages.Remove(message);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<Message?> GetMessageByIdAsync(string id)
    {
        return await _context.Messages.FindAsync(id);
    }

    public async Task<PaginatedResult<MessageDto>> GetMessagesForUserAsync(MessageParams messageParams)
    {
        var query = _context.Messages
            .OrderByDescending(m => m.SentAt)
            .ThenByDescending(m => m.Id)
            .AsQueryable();

            query = messageParams.Container switch
            {
                
                "Outbox" => query.Where(m => m.SenderId == messageParams.MemeberId && !m.SenderDeleted ),
                 "Inbox" => query.Where(m => m.RecipientId == messageParams.MemeberId && !m.RecipientDeleted),
                _ => query.Where(m => m.RecipientId == messageParams.MemeberId)
            };

        var messageQuery = query.Select(MessageExtentions.ToDtoProjection);
        
        return await PaginatedResult<MessageDto>.CreateAsync(messageQuery, 
        messageParams.PageNumber, messageParams.PageSize);
            
    }

    public async Task<IReadOnlyList<MessageDto>> GetMessageThreadAsync(string currentUserId, string recipientId)
    {
         await _context.Messages
            .Where(m => m.RecipientId == currentUserId && 
                        m.SenderId == recipientId &&
                        m.ReadAt == null)
            .ExecuteUpdateAsync(m => m.SetProperty(x=> x.ReadAt,DateTime.UtcNow));

        var messages = await _context.Messages
            .Where(m => (/*incoming*/m.RecipientId == currentUserId && m.SenderId == recipientId && !m.RecipientDeleted) ||
                        (/*outgoing*/m.RecipientId == recipientId && m.SenderId == currentUserId && !m.SenderDeleted)
                        )
            .OrderBy(m => m.SentAt)
            .Select(MessageExtentions.ToDtoProjection)
            .ToListAsync();

        return messages;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}