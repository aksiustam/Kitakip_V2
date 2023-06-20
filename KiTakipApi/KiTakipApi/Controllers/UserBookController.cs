using AutoMapper;
using KiTakipApi.Dto;
using KiTakipApi.Interfaces;
using KiTakipApi.Models;
using KiTakipApi.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace KiTakipApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserBookController : ControllerBase
    {
        private readonly IUserBookRepository _userbookRepository;
        private readonly IMapper _mapper;

        public UserBookController(IUserBookRepository userbookRepository, IMapper mapper)
        {
            _userbookRepository = userbookRepository;
            _mapper = mapper;
        }

        [HttpGet("{userId}")]
        [Authorize]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserBook>))]
        public IActionResult GetUserBooks(int userId)
        {
            var userbooks = _userbookRepository.GetUserBooks(userId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(userbooks);
        }


        [HttpPost]
        [Authorize]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateUserBook([FromQuery] int userId, [FromQuery] int bookId, [FromBody] UserBookDto createUserBook)
        {
            if (createUserBook == null)
                return BadRequest(ModelState);

            var exist = _userbookRepository.GetUserBooks(userId)
                .Where(p => p.BookId == bookId)
                .FirstOrDefault();

            if (exist != null)
            {
                ModelState.AddModelError("", "Book already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var bookMap = _mapper.Map<UserBook>(createUserBook);

            if (!_userbookRepository.CreateUserBook(userId, bookId,bookMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }
        
        [HttpPut]
        [Authorize]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateUserBook([FromQuery] int userId, [FromQuery] int bookId, [FromBody] UserBookDto updatedBook)
        {
            if (updatedBook == null)
                return BadRequest(ModelState);

            if (bookId != updatedBook.BookId)
                return BadRequest(ModelState);
            if (userId != updatedBook.UserId)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest();

            var userbookMap = _mapper.Map<UserBook>(updatedBook);

            if (!_userbookRepository.UpdateUserBook(userbookMap))
            {
                ModelState.AddModelError("", "Something went wrong updating UserBook");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete]
        [Authorize]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteUserBook([FromQuery] int userId, [FromQuery] int bookId)
        {
            var userbook = _userbookRepository.GetUserBook(userId, bookId);

            if (userbook == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            if (!_userbookRepository.DeleteUserBook(userbook))
            {
                ModelState.AddModelError("", "Something went wrong deleting UserBook");
            }   

            return NoContent();
        }
        

    }
}
