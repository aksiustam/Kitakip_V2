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

namespace KiTakipApi.Controllers
{
    [Authorize]
    public class WUserBookController : Controller
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public WUserBookController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: WUserBook
        public async Task<IActionResult> Index()
        {
            var dataContext = _context.UserBooks.Include(u => u.Book).Include(u => u.User);
            return View(await dataContext.ToListAsync());
        }

        // GET: WUserBook/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.UserBooks == null)
            {
                return NotFound();
            }

            var userBook = await _context.UserBooks
                .Include(u => u.Book)
                .Include(u => u.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userBook == null)
            {
                return NotFound();
            }

            return View(userBook);
        }

        // GET: WUserBook/Create
        public IActionResult Create()
        {
            ViewData["BookId"] = new SelectList(_context.Books, "Id", "Id");
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id");
            return View();
        }

        // POST: WUserBook/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserId,BookId,Mark,MarkDate,Live")] UserBookDto userBook)
        {
            var mapUserbook = _mapper.Map<UserBook>(userBook);
            if (ModelState.IsValid)
            {
                _context.Add(mapUserbook);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["BookId"] = new SelectList(_context.Books, "Id", "Id", userBook.BookId);
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", userBook.UserId);
            return View(userBook);
        }

        // GET: WUserBook/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.UserBooks == null)
            {
                return NotFound();
            }

            var userBook = await _context.UserBooks.FindAsync(id);
            if (userBook == null)
            {
                return NotFound();
            }
            ViewData["BookId"] = new SelectList(_context.Books, "Id", "Id", userBook.BookId);
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", userBook.UserId);
            return View(userBook);
        }

        // POST: WUserBook/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserId,BookId,Mark,MarkDate,Live")] UserBookDto userBook)
        {
            if (id != userBook.Id)
            {
                return NotFound();
            }
            var mapUserbook = _mapper.Map<UserBook>(userBook);
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(mapUserbook);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserBookExists(userBook.Id))
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
            ViewData["BookId"] = new SelectList(_context.Books, "Id", "Id", userBook.BookId);
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", userBook.UserId);
            return View(userBook);
        }

        // GET: WUserBook/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.UserBooks == null)
            {
                return NotFound();
            }

            var userBook = await _context.UserBooks
                .Include(u => u.Book)
                .Include(u => u.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userBook == null)
            {
                return NotFound();
            }

            return View(userBook);
        }

        // POST: WUserBook/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.UserBooks == null)
            {
                return Problem("Entity set 'DataContext.UserBooks'  is null.");
            }
            var userBook = await _context.UserBooks.FindAsync(id);
            if (userBook != null)
            {
                _context.UserBooks.Remove(userBook);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserBookExists(int id)
        {
          return (_context.UserBooks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
