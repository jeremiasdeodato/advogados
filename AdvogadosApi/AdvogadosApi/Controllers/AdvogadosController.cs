using AdvogadosApi.API.Core;
using AdvogadosApi.Application.DTOs;
using AdvogadosApi.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AdvogadosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvogadosController : ControllerBase<AdvogadosController>
    {
        private readonly IAdvogadoService _service;

        public AdvogadosController(IAdvogadoService service)
        {
            _service = service;
        }

        [HttpGet("consultar")]
        public async Task<IActionResult> Get()
        {
            var advogados = await _service.ObterLista();
            return ResponseGet(advogados);
        }

        [HttpGet("consultar/{advogadoId}")]
        public async Task<IActionResult> Get(Guid advogadoId)
        {
            var advogado = await _service.ObterPorId(advogadoId);
            return Ok(advogado);
        }

        [HttpPost("inserir")]
        public async Task<IActionResult> Post(AdvogadoDto advogadoDto)
        {
            await _service.Inserir(advogadoDto);

            return ResponsePost("Advogado Inserido com sucesso");
        }

        [HttpPut("atualizar/{advogadoId}")]
        public async Task<IActionResult> Put(Guid advogadoId, AdvogadoDto advogadoDto)
        {
            await _service.Atualizar(advogadoId, advogadoDto);

            return ResponsePost("Advogado atualizado com sucesso");
        }

        [HttpDelete("excluir/{advogadoId}")]
        public async Task<IActionResult> Delete(Guid advogadoId)
        {
            await _service.Excluir(advogadoId);

            return ResponsePost("Advogado excluído com sucesso");
        }
    }
}
