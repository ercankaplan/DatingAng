namespace DatingAPI.DTOs;

public class MessageDto
{
     public required string Id { get; set; } 
        public required string SenderId { get; set; } = null!;
        public required string SenderDisplayName { get; set; } = null!;
        public  string? SenderImageUrl { get; set; } = null!;
      
        public required string RecipientId { get; set; } = null!;
        public required string RecipientDisplayName { get; set; } = null!;
        public  string? RecipientImageUrl { get; set; } = null!;
        public required string Content { get; set; } = null!;

        public DateTime SentAt { get; set; } = DateTime.UtcNow;

        public DateTime? ReadAt { get; set; } = null;

}