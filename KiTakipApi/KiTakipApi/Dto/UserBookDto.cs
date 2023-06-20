namespace KiTakipApi.Dto
{
    public class UserBookDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int BookId { get; set; }

        public string? Mark { get; set; }

        public DateTime? MarkDate { get; set; }

        public bool? Live { get; set; }
    }
}
