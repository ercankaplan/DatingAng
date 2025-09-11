using System;

namespace DatingAPI.DTOs;

public class MemberDto
{
    public string Id { get; set; }= "";
    public string Email { get; set; } = "";
    public string DisplayName { get; set; } = "";
    public DateTime Created { get; set; }
    public DateTime LastActive { get; set; }
}
