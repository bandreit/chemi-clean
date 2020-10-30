using backend_chemi_clean.Data;
using Microsoft.EntityFrameworkCore;

namespace backend_chemi_clean.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Product> tblProduct { get; set; }
    }
}