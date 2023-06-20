namespace KiTakipApi.Dto.Web
{
    public class BookUploadDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Writer { get; set; }
        public string? Desc { get; set; }
        public string? Pub { get; set; }
        public int? Page { get; set; }
        public IFormFile? file { get; set; }
        public DateTime? Pubdate { get; set; }
    }
}
