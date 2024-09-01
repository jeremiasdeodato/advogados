using AdvogadosApi.Domain.Entidades;

namespace AdvogadosApi.Infrastructure.Interfaces
{
    public interface IAdvogadoRepository
    {
        Task<IEnumerable<Advogado>> ObterLista();
        Task<Advogado> ObterPorId(Guid advogadoId);
        Task Inserir(Advogado advogado);
        Task Atualizar(Advogado advogado);
        Task Excluir(Advogado advogado);
    }
}
