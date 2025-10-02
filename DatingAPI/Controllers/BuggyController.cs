using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : BaseApiController
    {
        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("This is not a good request");
        }

        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            var thing = new { Id = 1, Name = "Test", Description = (string)null };
            var thingToReturn = thing.Description.ToString(); // this will cause a null reference exception
            return Ok(thingToReturn);
        }

        [HttpGet("auth")]
        public IActionResult GetUnauthorized()
        {
            return Unauthorized();
        }

        [HttpGet("register")]
        public IActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "This is the first problem");
            ModelState.AddModelError("Problem2", "This is the second problem");
            return ValidationProblem();
        }
        

    }
}
