using DatingAPI.Entities;
using Microsoft.AspNetCore.Mvc;

namespace DatingAPI.Interfaces
{
    public interface IMemberService
    {
        Task<Member?> GetMemberByIdAsync(string id);
        Task<IReadOnlyList<Member>> GetMembersAsync();
        Task<IReadOnlyList<Photo>> GetMemberPhotosAsync(string id);
    }
}
