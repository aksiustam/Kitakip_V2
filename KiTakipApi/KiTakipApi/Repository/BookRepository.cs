using KiTakipApi.Data;
using KiTakipApi.Interfaces;
using KiTakipApi.Models;
using System.Xml.Linq;

namespace KiTakipApi.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly DataContext _context;

        public BookRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateBook(Book book)
        {
            _context.Add(book);

            return Save();
        }

        public bool DeleteBook(Book book)
        {
            _context.Remove(book);
            return Save();
        }

        public Book GetBook(int id)
        {
            return _context.Books.Where(p => p.Id == id).FirstOrDefault();
        }

        public Book GetBookByName(string name)
        {
            return _context.Books.Where(p => p.Name == name).FirstOrDefault();
        }

        public ICollection<Book> GetBooks()
        {
            return _context.Books.OrderBy(p => p.Id).ToList();
        }

        public bool BookExists(int id)
        {
            return _context.Books.Any(p => p.Id == id);
        }
        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateBook(Book book)
        {
            _context.Update(book);
            return Save();
        }
    }
}
