using System;
using DatingAPI.DTOs;
using DatingAPI.Entities;
using DatingAPI.Interfaces;

namespace DatingAPI.Extensions;

public static class AppUserExtensions
{
    public static UserDto ToDto(this AppUser user)
    {
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = string.Empty,
            //Created = user.Created,
            //LastActive = user.LastActive,
            //ImageUrl = user.Photos?.FirstOrDefault(p => p.IsMain)?.Url
        };
    }
    public static UserDto ToDto(this AppUser user,ITokenService tokenService)
    {
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = tokenService.CreateToken(user),
            //Created = user.Created,
            //LastActive = user.LastActive,
            //ImageUrl = user.Photos?.FirstOrDefault(p => p.IsMain)?.Url
        };
    }
    
    

}
