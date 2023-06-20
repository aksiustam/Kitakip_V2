namespace KiTakipApi.Models
{
    public class AdminUser
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public byte[] PassHash { get; set; }

        public byte[] PassSalt { get; set; }

    }
}
