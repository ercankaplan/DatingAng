using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DatingAPI.Entities;
using DatingAPI.Interfeaces;
using Microsoft.IdentityModel.Tokens;

namespace DatingAPI.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        // Implementation for creating a token for the user
        var tokenKey = config["TokenKey"] ?? throw new InvalidOperationException("Token key is not configured.");

        if (tokenKey.Length < 64)
            throw new InvalidOperationException("Token key must be at least 64 characters long.");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        var claims = new List<Claim>
        {
            new (ClaimTypes.Email, user.Email),
            new (ClaimTypes.NameIdentifier, user.Id),
            new (ClaimTypes.GivenName, user.DisplayName),
            //new ("OpaqueId","stg")
        };

        var tokenDescripter = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescripter);
        return tokenHandler.WriteToken(token);


    }
}
