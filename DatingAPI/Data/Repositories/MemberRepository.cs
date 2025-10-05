using System;
using DatingAPI.Entities;
using DatingAPI.Interfaces.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;



namespace DatingAPI.Data.Repositories;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
    private readonly AppDbContext _context = context;

    public async Task<IReadOnlyList<Member>> GetAllAsync()
    {
        return await _context.Members.ToListAsync();
    }

    public async Task<Member?> GetMemberByIdAsync(string id)
    {
        return await _context.Members.FindAsync(id);
    }

    public async Task<IReadOnlyList<Photo>> GetPhotosAsync(string memberId)
    {
        return await _context.Members
            .Where(x => x.Id == memberId)
            .SelectMany(o=> o.Photos)
            .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void UpdateMember(Member member)
    {
        _context.Entry(member).State = EntityState.Modified;
    }
}
