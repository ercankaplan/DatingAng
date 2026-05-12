using System.Linq.Expressions;
using DatingAPI.DTOs;
using DatingAPI.Entities;

public static class MessageExtentions
{
    public static MessageDto ToDto(this Message message)
    {
        return new MessageDto
        {
            Id = message.Id,
            SenderId = message.SenderId,
            SenderDisplayName = message.Sender.DisplayName,
            SenderImageUrl = message.Sender.ImageUrl,
            RecipientId = message.RecipientId,
            RecipientDisplayName = message.Recipient.DisplayName,
            RecipientImageUrl = message.Recipient.ImageUrl,
            Content = message.Content,
            SentAt = message.SentAt,
            ReadAt = message.ReadAt
        };
    }

    public static Expression<Func<Message, MessageDto>> ToDtoProjection = message => new MessageDto
    {
        Id = message.Id,
        SenderId = message.SenderId,
        SenderDisplayName = message.Sender.DisplayName,
        SenderImageUrl = message.Sender.ImageUrl,
        RecipientId = message.RecipientId,
        RecipientDisplayName = message.Recipient.DisplayName,
        RecipientImageUrl = message.Recipient.ImageUrl,
        Content = message.Content,
        SentAt = message.SentAt,
        ReadAt = message.ReadAt
    };

}