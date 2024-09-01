using AdvogadosApi.Domain.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AdvogadosApi.Infrastructure.Mapping
{
    public class AdvogadosMapping : IEntityTypeConfiguration<Advogado>
    {
        public void Configure(EntityTypeBuilder<Advogado> builder)
        {
            builder.ToTable("Advogados");

            builder.HasKey(a => a.Id);

            builder.Property(a => a.Id)
                  .HasColumnType("CHAR(36)")
                  .IsRequired();

            builder.Property(a => a.Nome)
                  .HasMaxLength(255)
                  .IsRequired();

            builder.Property(a => a.DataDeNascimento)
                  .HasColumnType("DATE")
                  .IsRequired();

            builder.Property(a => a.Email)
                  .HasMaxLength(255)
                  .IsRequired();

            builder.Property(a => a.Senioridade)
                  .HasConversion<string>()
                  .HasColumnType("ENUM('Junior', 'Pleno', 'Senior')")
                  .IsRequired();

            builder.Property(a => a.Ativo)
                  .HasColumnType("BOOLEAN")
                  .HasDefaultValue(true)
                  .IsRequired();

            builder.Property(a => a.DataCriacao)
                  .HasColumnType("DATETIME")
                  .IsRequired();

            builder.HasOne(a => a.Endereco)
                   .WithMany()
                   .HasForeignKey(a => a.EnderecoId)
                   .IsRequired();
        }
    }
}
