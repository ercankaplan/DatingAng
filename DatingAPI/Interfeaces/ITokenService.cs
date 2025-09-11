using System;
using DatingAPI.Entities;

namespace DatingAPI.Interfeaces;

public interface ITokenService
{
    string CreateToken(AppUser user);
}
