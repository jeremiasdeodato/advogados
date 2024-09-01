using AdvogadosApi.Domain.Entidades;
using AdvogadosApi.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AdvogadosApi.Infrastructure.Repositories
{
    public class AdvogadoRepository : IAdvogadoRepository
    {
        private readonly AppDbContext _context;

        public AdvogadoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Advogado>> ObterLista()
        {
            return await _context.Advogado
                .Include(p => p.Endereco)
                .ToListAsync();
        }

        public async Task<Advogado> ObterPorId(Guid id)
        {
            return await _context.Advogado
                .Include(p => p.Endereco)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Inserir(Advogado advogado)
        {
            await _context.AddAsync(advogado);
            await _context.SaveChangesAsync();
        }

        public async Task Atualizar(Advogado advogado)
        {
            _context.Update(advogado);
            await _context.SaveChangesAsync();
        }

        public async Task Excluir(Advogado advogado)
        {
            _context.Remove(advogado);
            await _context.SaveChangesAsync();
        }
    }
}
