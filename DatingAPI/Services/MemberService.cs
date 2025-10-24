using DatingAPI.Entities;
using DatingAPI.Interfaces;
using DatingAPI.Interfaces.IRepositories;
using Microsoft.AspNetCore.Mvc;

namespace DatingAPI.Services
{
    public class MemberService(IMemberRepository memberRepository) : IMemberService
    {
        public Task<Member?> GetMemberByIdAsync(string id)
        {

            return memberRepository.GetMemberByIdAsync(id);
        }

        public async Task<IReadOnlyList<Photo>> GetMemberPhotosAsync(string id)
        {
            return await memberRepository.GetPhotosAsync(id);
        }

        public async Task<IReadOnlyList<Member>> GetMembersAsync()
        {
            return await memberRepository.GetAllAsync();
        }

        public async Task<IReadOnlyList<Member>> GetMatchedMembersAsync()
        {
            return await memberRepository.GetAllAsync();
        }
    }
}
