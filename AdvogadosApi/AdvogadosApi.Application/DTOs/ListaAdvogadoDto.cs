using AdvogadosApi.Domain.Enums;

namespace AdvogadosApi.Application.DTOs
{
    public class ListaAdvogadoDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataDeNascimento { get; set; }
        public string Email { get; set; }
        public EnderecoDto Endereco { get; set; }
        public Senioridade Senioridade { get; set; }        
    }
}
