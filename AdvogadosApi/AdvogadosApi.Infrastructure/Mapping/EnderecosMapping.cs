using AdvogadosApi.Domain.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AdvogadosApi.Infrastructure.Mapping
{
    public class EnderecosMapping : IEntityTypeConfiguration<Endereco>
    {
        public void Configure(EntityTypeBuilder<Endereco> builder)
        {
            builder.ToTable("Enderecos");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Id)
                   .HasColumnType("CHAR(36)")
                   .IsRequired();

            builder.Property(e => e.Logradouro)
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(e => e.Bairro)
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(e => e.Estado)
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(e => e.Cep)
                   .HasMaxLength(20)
                   .IsRequired();

            builder.Property(e => e.Numero)
                   .HasMaxLength(20)
                   .IsRequired();

            builder.Property(e => e.Complemento)
                   .HasMaxLength(255)
                   .IsRequired(false);

            builder.Property(a => a.Ativo)
                  .HasColumnType("BOOLEAN")
                  .HasDefaultValue(true)
                  .IsRequired();

            builder.Property(a => a.DataCriacao)
                  .HasColumnType("DATETIME")
                  .IsRequired();
        }
    }
}
