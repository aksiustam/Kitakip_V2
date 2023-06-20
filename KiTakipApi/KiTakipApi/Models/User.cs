namespace KiTakipApi.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }
        public string Name { get; set; }
        public byte[] PassHash { get; set; }

        public byte[] PassSalt { get; set; }

        public string RefreshToken { get; set; } = string.Empty;
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }

        public ICollection<UserBook> UserBooks { get; set; }
    }
}
