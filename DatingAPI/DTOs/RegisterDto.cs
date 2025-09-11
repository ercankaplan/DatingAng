using System;
using System.ComponentModel.DataAnnotations;

namespace DatingAPI.DTOs;

public class RegisterDto
{
    [Required(ErrorMessage = "Email is required", AllowEmptyStrings = false)]
    public string Email { get; set; } = "";
    [Required(ErrorMessage = "Display Name is required", AllowEmptyStrings = false)]
    public string DisplayName { get; set; } = "";
    [Required(ErrorMessage = "Password is required", AllowEmptyStrings = false)]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters long")]
    public string Password { get; set; } = "";
}
