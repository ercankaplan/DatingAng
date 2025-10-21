using DatingAPI.Data;
using DatingAPI.Entities;
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
        public async Task<ActionResult< IReadOnlyList<Photo>>> GetMemberPhotos(string id)
        {
            var photos = await memberService.GetMemberPhotosAsync(id);

            return Ok(photos);
        }
    }
}
