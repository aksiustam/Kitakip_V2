﻿namespace KiTakipApi.Models
{
    public class UserBook
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int BookId { get; set; }

        public string? Mark{ get; set; }

        public DateTime? MarkDate { get; set; }

        public bool? Live { get; set; }

        public Book Book { get; set; }

        public User User { get; set; }
    }
}
