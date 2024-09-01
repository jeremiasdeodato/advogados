using AdvogadosApi.Application.DTOs;

namespace AdvogadosApi.Application.Interfaces
{
    public interface IAdvogadoService
    {
        Task<IEnumerable<ListaAdvogadoDto>> ObterLista();
        Task<AdvogadoDto> ObterPorId(Guid advogadoId);
        Task Inserir(AdvogadoDto advogadoDto);
        Task Atualizar(Guid advogadoId, AdvogadoDto advogadoDto);
        Task Excluir(Guid advogadoId);
    }
}
