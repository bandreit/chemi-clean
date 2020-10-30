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
        public DbSet<tblProductFile> TblProductFile { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tblProductFile>().HasKey(x => x.ID);
            base.OnModelCreating(modelBuilder);
        }
    }
}