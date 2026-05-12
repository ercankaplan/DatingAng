using DatingAPI.Helpers;

public class MessageParams : PaginationParams
{
    public string? MemeberId { get; set; }
    public string Container { get; set; } = "Inbox";
}