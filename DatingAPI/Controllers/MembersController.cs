using System.Security.Claims;
using DatingAPI.Data;
using DatingAPI.DTOs;
using DatingAPI.Entities;
using DatingAPI.Extensions;
using DatingAPI.Interfaces;
using DatingAPI.Interfaces.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace DatingAPI.Controllers
{

     [Authorize]
    public class MembersController(IMemberService memberService) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
            return Ok(await memberService.GetMembersAsync());

        }

    
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await memberService.GetMemberByIdAsync(id);

            if (member == null) return NotFound();

            return member;
        }



        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhotos(string id)
        {
            var photos = await memberService.GetMemberPhotosAsync(id);

            return Ok(photos);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdateDto memberUpdateDto)
        {

            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (id == null) return BadRequest("Opps! Unable to find id in the token");

            var existingMember = await memberService.GetMemberForUpdateByIdAsync(id);
            
            if (existingMember == null) return NotFound("Member not found");
           
            existingMember.DisplayName = memberUpdateDto.DisplayName ?? existingMember.DisplayName;
            existingMember.DateOfBirth = memberUpdateDto.DateOfBirth.HasValue ? DateOnly.FromDateTime(memberUpdateDto.DateOfBirth.Value) : existingMember.DateOfBirth;
            existingMember.City = memberUpdateDto.City ?? existingMember.City;
            existingMember.Country = memberUpdateDto.Country ?? existingMember.Country;
            existingMember.Gender = memberUpdateDto.Gender ?? existingMember.Gender;
            existingMember.Description = memberUpdateDto.Description ?? existingMember.Description;

            existingMember.AppUser!.DisplayName = memberUpdateDto.DisplayName ?? existingMember.AppUser.DisplayName;


            if (await memberService.UpdateMemberAsync(existingMember)) return NoContent();

            return BadRequest("Failed to update member");
        }
    }
}
