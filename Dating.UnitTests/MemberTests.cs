using System.Collections.Generic;
using System.Threading.Tasks;
using DatingAPI.Entities;
using DatingAPI.Interfaces;
using DatingAPI.Interfaces.IRepositories;
using DatingAPI.Services;
using Moq;
using Xunit;

public class MemberTests
{
    [Fact]
    public async Task GetMemberByIdAsync_ReturnsMember_WhenIdIsValid()
    {
        // Arrange
        var mockRepo = new Mock<IMemberRepository>();
        var member = new Member { Id = "1", DisplayName = "Bob", City = "X", Country = "Y", Gender = "M", Description = "desc", DateOfBirth = new System.DateOnly(1990,1,1) };
        mockRepo.Setup(r => r.GetMemberByIdAsync("1")).ReturnsAsync(member);

        var service = new MemberService(mockRepo.Object);

        // Act
        var result = await service.GetMemberByIdAsync("1");

        // Assert
        Assert.NotNull(result);
        Assert.Equal("1", result!.Id);
    }

    [Fact]
    public async Task GetMemberByIdAsync_ReturnsNull_WhenIdIsNullOrEmpty()
    {
        var mockRepo = new Mock<IMemberRepository>();
        var service = new MemberService(mockRepo.Object);

        var result = await service.GetMemberByIdAsync("");

        Assert.Null(result);
    }

    [Fact]
    public async Task GetMembersAsync_ReturnsAllMembers()
    {
        var mockRepo = new Mock<IMemberRepository>();
        var members = new List<Member> { new Member { Id = "1", DisplayName = "A", City = "C", Country = "D", Gender = "F", Description = "d", DateOfBirth = new System.DateOnly(1990,1,1) } };
        mockRepo.Setup(r => r.GetAllAsync()).ReturnsAsync(members);

        var service = new MemberService(mockRepo.Object);

        var result = await service.GetMembersAsync();

        Assert.NotNull(result);
        Assert.Single(result);
    }

    [Fact]
    public async Task GetMemberPhotosAsync_ReturnsPhotos()
    {
        var mockRepo = new Mock<IMemberRepository>();
        var photos = new List<Photo> { new Photo { Id = 1, Url = "u", MemberId = "1" } };
        mockRepo.Setup(r => r.GetPhotosAsync("1")).ReturnsAsync(photos);

        var service = new MemberService(mockRepo.Object);

        var result = await service.GetMemberPhotosAsync("1");

        Assert.NotNull(result);
        Assert.Single(result);
    }
}