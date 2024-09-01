using AdvogadosApi.Domain.Core;

namespace AdvogadosApi.Domain.Entidades
{
    public class Endereco : EntidadeBase
    {
        public Guid Id { get; set; }
        public string Logradouro { get; set; }
        public string Bairro { get; set; }
        public string Estado { get; set; }
        public string Cep { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }

        public Endereco(string logradouro, string bairro, string estado, string cep, string numero, string complemento)
        {
            Logradouro=logradouro;
            Bairro=bairro;
            Estado=estado;
            Cep=cep;
            Numero=numero;
            Complemento=complemento;
        }

        public override bool EhValido()
        {
            throw new NotImplementedException();
        }

        public override string? MensagemValidacao()
        {
            throw new NotImplementedException();
        }
    }
    
}
