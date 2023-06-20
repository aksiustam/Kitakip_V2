using KiTakipApi.Data;
using KiTakipApi.Interfaces;
using KiTakipApi.Models;
using Microsoft.EntityFrameworkCore;

namespace KiTakipApi.Repository
{
    public class UserBookRepository : IUserBookRepository
    {
        private readonly DataContext _context;

        public UserBookRepository(DataContext context)
        {
            _context = context;
        }

        public UserBook GetUserBook(int userId, int bookId)
        {
            return _context.UserBooks.Where(p => p.UserId == userId && p.BookId == bookId).FirstOrDefault();
        }

        public bool CreateUserBook(int userId,int bookId,UserBook userbook)
        {
            var book = _context.Books.Where(a => a.Id == bookId).FirstOrDefault();
            var user = _context.Users.Where(a => a.Id == userId).FirstOrDefault();

            if(book == null && user == null)
                return false;

            var newuserbook = new UserBook()
            {
                User = user,
                Book = book,
                Mark = userbook.Mark,
                MarkDate = userbook.MarkDate,
                Live = userbook.Live,
            };

            _context.Add(newuserbook);


            return Save();
        }

        public bool DeleteUserBook(UserBook userbook)
        {
            _context.Remove(userbook);
            return Save();
        }

        public ICollection<UserBook> GetUserBooks(int userId)
        {
            
           
            var userbook = _context.UserBooks.Where(p => p.UserId == userId).Include(p => p.Book).Include(p => p.User)
                            .Select(p => new UserBook
                            {
                                UserId = p.UserId,
                                BookId = p.BookId,
                                Mark = p.Mark,
                                MarkDate = p.MarkDate,
                                User = new User
                                {
                                    Id = p.User.Id,
                                    Name = p.User.Name,
                                    Email = p.User.Email,                           

                                },
                                Book = new Book
                                {
                                    Id = p.Book.Id,
                                    Name = p.Book.Name,
                                    Writer = p.Book.Writer,
                                    Desc = p.Book.Desc,
                                    Pub = p.Book.Pub,
                                    Page = p.Book.Page,
                                    Url = p.Book.Url,
                                    Pubdate = p.Book.Pubdate,
                                    
                                }
                            }).ToList();
            /*
            var userbook = _context.UserBooks.Where(p => p.UserId == userId)
                .Include(p => p.Book).Include(p => p.User).ToList();
             */
            return userbook;
        }
        public bool Save()
        {

            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateUserBook(UserBook userbook)
        {
            _context.Update(userbook);
            return Save();
        }
    }
}
