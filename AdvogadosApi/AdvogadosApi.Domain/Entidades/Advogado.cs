using AdvogadosApi.Domain.Core;
using AdvogadosApi.Domain.Enums;

namespace AdvogadosApi.Domain.Entidades
{
    public class Advogado : EntidadeBase
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataDeNascimento { get; set; }
        public string Email { get; set; }
        public Guid EnderecoId { get; set; }
        public Endereco Endereco { get; set; }
        public Senioridade Senioridade { get; set; }

        public Advogado() { }

        public Advogado(string nome, DateTime dataDeNascimento, string email, Endereco endereco, Senioridade senioridade)
        {
            Nome=nome;
            DataDeNascimento=dataDeNascimento;
            Email=email;
            Endereco=endereco;
            Senioridade=senioridade;
        }

        private string? ValidarAdvogado()
        {
            if (Nome == null)
                return $"Campo {nameof(Nome)} é obrigatório e não pode ser nulo.";

            if (Endereco == null)
                return $"Campo {nameof(Endereco)} é obrigatório e não pode ser nulo.";

            if (Senioridade == null)
                return $"Campo {nameof(Senioridade)} é obrigatório e não pode ser nulo.";

            return null;
        }

        public override bool EhValido()
        {
            return ValidarAdvogado() == null;
        }

        public override string? MensagemValidacao()
        {
            var validarAdvogado = ValidarAdvogado();

            if (validarAdvogado == null)
                return null;
            else
                return validarAdvogado;
        }
    }
}
