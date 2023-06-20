using KiTakipApi.Data;
using KiTakipApi.Interfaces;
using KiTakipApi.Models;

namespace KiTakipApi.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        } 
        public bool CreateUser(User user)
        {
            _context.Add(user);

            return Save();
        }

        public bool DeleteUser(User user)
        {
            _context.Remove(user);
            return Save();
        }

        public ICollection<User> GetUsers()
        {
            return _context.Users.OrderBy(p => p.Id).ToList();
        }

        public User GetUser(int id)
        {
            return _context.Users.Where(p => p.Id == id).FirstOrDefault();
        }

        public User GetUserByEmail(string Email)
        {
            return _context.Users.Where(p => p.Email.Trim().ToUpper() == Email.Trim().ToUpper()).FirstOrDefault();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateUser(User user)
        {
            _context.Update(user);
            return Save();
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(p => p.Id == id);
        }

        
    }
}
