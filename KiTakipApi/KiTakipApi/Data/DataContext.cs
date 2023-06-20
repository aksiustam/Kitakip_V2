using KiTakipApi.Models;
using Microsoft.EntityFrameworkCore;
using KiTakipApi.Dto;

namespace KiTakipApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Book> Books { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<UserBook> UserBooks { get; set; }

        public DbSet<AdminUser> AdminUsers { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserBook>()
                .HasOne(u => u.User)
                .WithMany(ub => ub.UserBooks)
                .HasForeignKey(u => u.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserBook>()
                .HasOne(u => u.Book)
                .WithMany(ub => ub.UserBooks)
                .HasForeignKey(u => u.BookId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);


        }
    }
}
