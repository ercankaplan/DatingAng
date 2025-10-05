using DatingAPI.Entities;

namespace DatingAPI.Interfaces.IRepositories
{
    public interface IMemberRepository
    {
        void UpdateMember(Member member);

        Task<bool> SaveAllAsync();

        Task<IReadOnlyList<Member>> GetAllAsync();

        Task<Member?> GetMemberByIdAsync(string id);

        Task<IReadOnlyList<Photo>> GetPhotosAsync(string memberId);
    }
}
