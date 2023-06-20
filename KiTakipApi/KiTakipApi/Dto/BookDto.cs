﻿namespace KiTakipApi.Dto
{
    public class BookDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }
        public string? Writer { get; set; }
        public string? Desc { get; set; }
        public string? Pub { get; set; }
        public int? Page { get; set; }
        public string? Url { get; set; }
        public DateTime? Pubdate { get; set; }
    }
}
