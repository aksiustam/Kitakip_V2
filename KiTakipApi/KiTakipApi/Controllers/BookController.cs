using AutoMapper;
using KiTakipApi.Dto;
using KiTakipApi.Interfaces;
using KiTakipApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace KiTakipApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;


        public BookController(IBookRepository bookRepository, IMapper mapper)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
        }


        [HttpGet("Download/{bookId}.epub")]
        
        public async Task<IActionResult> DownloadFile(int bookId)
        {
            if (!_bookRepository.BookExists(bookId))
                return NotFound();


            var book = _bookRepository.GetBook(bookId);

            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles", book.Url);

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filepath, out var contenttype))
            {
                contenttype = "application/epub+zip";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(filepath);
            return File(bytes, contenttype, Path.GetFileName(filepath));
        }


        [HttpGet]
        [ProducesResponseType(200, Type= typeof(IEnumerable<Book>))]
        [Authorize]
        public IActionResult GetBooks()
        {
            
            var books = _mapper.Map<List<BookDto>>(_bookRepository.GetBooks());

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(books);
        }

        [HttpGet("{bookId}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(Book))]
        [ProducesResponseType(400)]
        public IActionResult GetBook(int bookId)
        {
            if (!_bookRepository.BookExists(bookId))
                return NotFound();

            var book = _mapper.Map<BookDto>(_bookRepository.GetBook(bookId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(book);
        }

        [HttpGet("byName/{bookName}")]
        [Authorize]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Book>))]
        public IActionResult GetBooksByName(string bookName)
        {
            var books = _mapper.Map<List<BookDto>>(_bookRepository.GetBooks()
                .Where(p => p.Name.Trim().ToUpper().Contains(bookName.TrimEnd().ToUpper())).ToList());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(books);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateBook([FromBody] BookDto createBook)
        {
            if (createBook == null)
                return BadRequest(ModelState);

            var exist = _bookRepository.GetBooks()
                .Where(p => p.Name.Trim().ToUpper() == createBook.Name.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (exist != null)
            {
                ModelState.AddModelError("", "Book already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var bookMap = _mapper.Map<Book>(createBook);

            if (!_bookRepository.CreateBook(bookMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }


        [HttpPut("{bookId}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateBook(int bookId, [FromBody] BookDto updatedBook)
        {
            if (updatedBook == null)
                return BadRequest(ModelState);

            if (bookId != updatedBook.Id)
                return BadRequest(ModelState);

            if (!_bookRepository.BookExists(bookId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var bookMap = _mapper.Map<Book>(updatedBook);

            if (!_bookRepository.UpdateBook(bookMap))
            {
                ModelState.AddModelError("", "Something went wrong updating Book");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{bookId}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteBook(int bookId)
        {
            if (!_bookRepository.BookExists(bookId))
            {
                return NotFound();
            }

            var bookToDelete = _bookRepository.GetBook(bookId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_bookRepository.DeleteBook(bookToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting category");
            }

            return NoContent();
        }

        
    }
}
