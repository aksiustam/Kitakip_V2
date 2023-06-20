using KiTakipApi.Models;

namespace KiTakipApi.Interfaces
{
    public interface IBookRepository
    {
        ICollection<Book> GetBooks();
        Book GetBook(int id);
        Book GetBookByName(string name);
        bool BookExists(int id);
        bool CreateBook(Book book);
        bool UpdateBook(Book book);
        bool DeleteBook(Book book);
        bool Save();
    }
}
