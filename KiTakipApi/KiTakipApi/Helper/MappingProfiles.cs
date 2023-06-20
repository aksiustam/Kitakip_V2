using AutoMapper;
using KiTakipApi.Dto;
using KiTakipApi.Dto.Web;
using KiTakipApi.Models;
using System.Diagnostics.Metrics;

namespace KiTakipApi.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Book, BookDto>();
            CreateMap<User, UserDto>();
            CreateMap<UserBook, UserBookDto>();
            CreateMap<BookDto, Book>();
            CreateMap<UserDto, User>();
            CreateMap<UserBookDto, UserBook>();
            CreateMap<BookUploadDto, Book>();
            CreateMap<Book, BookUploadDto>();

        }
    }
}
