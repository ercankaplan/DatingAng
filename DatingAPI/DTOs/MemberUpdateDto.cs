using System;

namespace DatingAPI.DTOs;

public class MemberUpdateDto
{

    public string? DisplayName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public string? Gender { get; set; }
    public string? Description { get; set; }
}
