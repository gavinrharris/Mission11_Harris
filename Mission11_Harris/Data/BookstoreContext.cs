using Microsoft.EntityFrameworkCore;
using Mission11_Harris.Models;

namespace Mission11_Harris.Data;

public class BookstoreContext : DbContext
{
    public BookstoreContext(DbContextOptions<BookstoreContext> options) : base(options) { }

    public DbSet<Book> Books { get; set; }
}
