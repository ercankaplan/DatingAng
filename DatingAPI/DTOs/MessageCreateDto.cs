public class MessageCreateDto
{
    public required string RecipientId { get; set; } = null!;
    public required string Content { get; set; } = null!;
}