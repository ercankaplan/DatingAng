using DatingAPI.Controllers;
using DatingAPI.DTOs;
using DatingAPI.Entities;
using DatingAPI.Extensions;
using DatingAPI.Helpers;
using DatingAPI.Interfaces.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class MessagesController(IMessageRepository messageRepository,
IMemberRepository memberRepository) : BaseApiController
{
    private readonly IMessageRepository _messageRepository = messageRepository;
    private readonly IMemberRepository _memberRepository = memberRepository;

[HttpPost]    
public  async Task<ActionResult<MessageDto>> CreateMessage(MessageCreateDto messageCreateDto)
    {

        var recipient = await _memberRepository.GetMemberByIdAsync(messageCreateDto.RecipientId);
        
        var sender = await _memberRepository.GetMemberByIdAsync(User.GetMemberId());

        if (recipient == null || sender == null || sender.Id == messageCreateDto.RecipientId) 
        return BadRequest("Cannot send the message");
         
         var msg = new Message
        {
            SenderId = sender.Id,
            RecipientId = messageCreateDto.RecipientId,
            Content = messageCreateDto.Content,
            Recipient = recipient,
            Sender = sender,
             
        };

        if(!await _messageRepository.AddMessageAsync(msg))
        {
            return BadRequest("Failed to send the message");
        }

        return msg.ToDto();
    }

    [HttpGet]
    public async Task<ActionResult<PaginatedResult<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
    {
        messageParams.MemeberId = User.GetMemberId();
        var messages = await _messageRepository.GetMessagesForUserAsync(messageParams);
        return Ok(messages);
    }
    
    [HttpGet("thread/{recipientId}")]
    public async Task<ActionResult<IReadOnlyList<MessageDto>>> GetMessageThread(string recipientId)
    {
        var currentUserId = User.GetMemberId();
        var messages = await _messageRepository.GetMessageThreadAsync(currentUserId, recipientId);
        return Ok(messages);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMessage(string id)
    {
        var message = await _messageRepository.GetMessageByIdAsync(id);
        if(message == null) 
            return BadRequest("Message not found");

        if(message.SenderId != User.GetMemberId() && message.RecipientId != User.GetMemberId())
        {
            return BadRequest("You cannot delete this message");
        }
        return Ok(await _messageRepository.DeleteMessageAsync(message));
    }

    
}