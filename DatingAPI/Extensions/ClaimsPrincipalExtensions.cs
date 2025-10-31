using System;
using System.Security.Claims;

namespace DatingAPI.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string GetMemberId(this ClaimsPrincipal user)
    {
        return user.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new InvalidOperationException("Member ID claim not found.")  ;
    }
}
