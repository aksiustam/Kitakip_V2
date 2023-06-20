using KiTakipApi.Models;

namespace KiTakipApi.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers();

        User GetUser(int id);
        User GetUserByEmail(string Email);
        bool UserExists(int id);
        bool CreateUser(User user);
        bool UpdateUser(User user);
        bool DeleteUser(User user);
        bool Save();
    }
}
