using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using KiTakipApi.Data;
using KiTakipApi.Models;
using KiTakipApi.Dto;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using KiTakipApi.Interfaces;
using KiTakipApi.Dto.Web;
using KiTakipApi.Repository;

namespace KiTakipApi.Controllers
{
    [Authorize]
    public class WBookController : Controller
    {

        private readonly IFileUploadService _fileUploadService;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public WBookController(DataContext context, IMapper mapper,IFileUploadService fileUploadService)
        {
            _fileUploadService = fileUploadService;
            _context = context;
            _mapper = mapper;
        }

        // GET: WBook
        public async Task<IActionResult> Index()
        {
              return _context.Books != null ? 
                          View(await _context.Books.ToListAsync()) :
                          Problem("Entity set 'DataContext.Books'  is null.");
        }

        // GET: WBook/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Books == null)
            {
                return NotFound();
            }

            var book = await _context.Books
                .FirstOrDefaultAsync(m => m.Id == id);
            if (book == null)
            {
                return NotFound();
            }

            return View(book);
        }

        // GET: WBook/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: WBook/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Writer,Desc,Pub,Page,file,Pubdate")] BookUploadDto book )
        {
            var mapbook = new Book
            {
                Name = book.Name,
                Writer = book.Writer,
                Desc = book.Desc,
                Pub = book.Pub,
                Pubdate = book.Pubdate,
                Page = book.Page,
                Url = book.file?.FileName,
            };

            try
            {
                if (await _fileUploadService.UploadFile(book.file))
                {
                    ViewBag.Message = "File Upload Successful";
                }
                else
                {
                    ViewBag.Message = "File Upload Failed";
                }
            }
            catch (Exception ex)
            {
                //Log ex
                ViewBag.Message = "File Upload Failed" + ex;
            }

            if (ModelState.IsValid)
            {
                _context.Add(mapbook);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(book);
        }

        // GET: WBook/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Books == null)
            {
                return NotFound();
            }

            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            var mapbook = _mapper.Map<BookUploadDto>(book);
            return View(mapbook);
        }

        // POST: WBook/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Writer,Desc,Pub,Page,file,Pubdate")] BookUploadDto book)
        {
            if (id != book.Id)
            {
                return NotFound();
            }

            var mapbook = new Book
            {
                Id = book.Id,
                Name = book.Name,
                Writer = book.Writer,
                Desc = book.Desc,
                Pub = book.Pub,
                Pubdate = book.Pubdate,
                Page = book.Page,
                Url = book.file?.FileName,
            };

            try
            {
                if (!await _fileUploadService.UploadFile(book.file))
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                //Log ex
                return NotFound();
            }


            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(mapbook);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BookExists(book.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(book);
        }

        // GET: WBook/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Books == null)
            {
                return NotFound();
            }

            var book = await _context.Books
                .FirstOrDefaultAsync(m => m.Id == id);
            if (book == null)
            {
                return NotFound();
            }

            return View(book);
        }

        // POST: WBook/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Books == null)
            {
                return Problem("Entity set 'DataContext.Books'  is null.");
            }
            var book = await _context.Books.FindAsync(id);
            if (book != null)
            {
                _context.Books.Remove(book);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BookExists(int id)
        {
          return (_context.Books?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
