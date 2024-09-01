using AdvogadosApi.Domain.Entidades;
using AdvogadosApi.Infrastructure.Mapping;
using Microsoft.EntityFrameworkCore;

namespace AdvogadosApi.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public DbSet<Advogado> Advogado { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new AdvogadosMapping());
            builder.ApplyConfiguration(new EnderecosMapping());
        }
    }
}
