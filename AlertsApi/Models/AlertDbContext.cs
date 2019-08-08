using Microsoft.EntityFrameworkCore;

namespace AlertsApi.Models
{
    public class AlertDbContext : DbContext
    {
        public AlertDbContext(DbContextOptions<AlertDbContext> options)
            : base(options)
        {
        }

        public DbSet<AlertItem> AlertItems { get; set; }
    }
}