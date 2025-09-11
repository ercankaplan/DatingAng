using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DatingAPI.Data;
using DatingAPI.Entities;
using System.Security.Cryptography;
using DatingAPI.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.Data;
using DatingAPI.Interfeaces;
using DatingAPI.Extensions;

namespace DatingAPI.Controllers
{

    public class AccountController(AppDbContext context,ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await UserExists(registerDto.Email))
                return BadRequest("Email is already used");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Email = registerDto.Email.ToLower(),
                DisplayName = registerDto.DisplayName,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();
            
            return user.ToDto(tokenService);

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginRequest loginRequest)
        {
            var user = await context.Users.SingleOrDefaultAsync(u => u.Email == loginRequest.Email.ToLower());

            if (user == null)
                return Unauthorized("Invalid email or password");

            using var hashedPassord = new HMACSHA512(user.PasswordSalt);
            byte[] hPass = hashedPassord.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginRequest.Password));
            
            if (!hPass.SequenceEqual(user.PasswordHash))
                return Unauthorized("Invalid email or password");

            return user.ToDto(tokenService);

        }

        private async Task<bool> UserExists(string email)
        {
            return await context.Users.AnyAsync(u => u.Email == email.ToLower());
        }
    }
}
