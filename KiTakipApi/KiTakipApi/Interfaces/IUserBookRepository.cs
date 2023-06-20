using KiTakipApi.Models;

namespace KiTakipApi.Interfaces
{
    public interface IUserBookRepository
    {
        ICollection<UserBook> GetUserBooks(int userId);

        UserBook GetUserBook(int userid , int bookid);

        bool CreateUserBook(int userId,int bookId,UserBook userbook);
        bool UpdateUserBook(UserBook userbook);
        bool DeleteUserBook(UserBook userbook);
        bool Save();

    }
}
