using System;

namespace DatingAPI.DTOs;

public class UserDto
{
    public string Id { get; set; }= "";
    public string Email { get; set; } = "";
    public string DisplayName { get; set; } = "";

    public required string Token { get; set; } = "";
    public string? ImgUrl { get; set; } 
    public DateTime Created { get; set; }
    public DateTime LastActive { get; set; }
}
