using DatingAPI.DTOs;
using DatingAPI.Entities;
using DatingAPI.Helpers;

namespace DatingAPI.Interfaces.IRepositories
{
    public interface IMessageRepository
    {
        Task<bool> AddMessageAsync(Message message);
        Task<bool> DeleteMessageAsync(Message message);
        Task<Message?> GetMessageByIdAsync(string id);
        Task<PaginatedResult<MessageDto>> GetMessagesForUserAsync(MessageParams messageParams);
        Task<IReadOnlyList<MessageDto>> GetMessageThreadAsync(string currentUserId, string recipientId);
        Task<bool> SaveAllAsync();
    }
}