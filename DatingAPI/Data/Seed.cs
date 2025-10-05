using DatingAPI.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace DatingAPI.Data;

public class Seed
{
    public static async Task SeedUsers(AppDbContext context)
    {

        if (await context.Users.AnyAsync()) return;

        var memberData = await File.ReadAllTextAsync("Data/SeedingMemberData.json");
        var members = System.Text.Json.JsonSerializer.Deserialize<List<SeedMemberDto>>(memberData);

        if (members == null)
        {
            Console.WriteLine("No members found in seed data.");
            return;
        }

        foreach (var seedMember in members)
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512();

            var user = new AppUser
            {
                DisplayName = seedMember.DisplayName,
                Email = seedMember.Email,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("1234qqqQ")),
                PasswordSalt = hmac.Key,
                ImageUrl = seedMember.ImageUrl,
                Id = seedMember.Id,
                Member = new Member
                {
                    Id = seedMember.Id, // Ensure Member Id matches AppUser Id
                    DateOfBirth = seedMember.DateOfBirth,
                    ImageUrl = seedMember.ImageUrl,
                    DisplayName = seedMember.DisplayName,
                    Created = seedMember.Created,
                    LastActive = seedMember.LastActive,
                    Gender = seedMember.Gender,
                    Description = seedMember.Description,
                    City = seedMember.City,
                    Country = seedMember.Country,
                }
            };

            user.Member.Photos = new List<Photo>
            {
                new Photo
                {
                    Url = seedMember.ImageUrl ?? "",
                    IsMain = true,
                    MemberId = seedMember.Id
                }
            };

            context.Users.Add(user);



        }


        await context.SaveChangesAsync();
    }
}

public class SeedMemberDto
{
    public required string Id { get; set; }
    public required string Email { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string? ImageUrl { get; set; }
    public required string DisplayName { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public string Gender { get; set; } = null!;
    public string Description { get; set; } = null!;
    public required string City { get; set; }
    public required string Country { get; set; }
}

