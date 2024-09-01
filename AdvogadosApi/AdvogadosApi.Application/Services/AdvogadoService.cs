using AdvogadosApi.Application.DTOs;
using AdvogadosApi.Application.Interfaces;
using AdvogadosApi.Domain.Core;
using AdvogadosApi.Domain.Entidades;
using AdvogadosApi.Infrastructure.Interfaces;
using AutoMapper;

namespace AdvogadosApi.Application.Services
{
    public class AdvogadoService : IAdvogadoService
    {
        private readonly IMapper _mapper;
        private readonly IAdvogadoRepository _advogadoRepository;

        public AdvogadoService(IMapper mapper, IAdvogadoRepository advogadoRepository)
        {
            _mapper=mapper;

            _advogadoRepository=advogadoRepository;
        }

        public async Task<IEnumerable<ListaAdvogadoDto>> ObterLista()
        {
            var advogados = await _advogadoRepository.ObterLista();
            var listaAdvogados = _mapper.Map<IEnumerable<ListaAdvogadoDto>>(advogados);

            return listaAdvogados;
        }

        public async Task<AdvogadoDto> ObterPorId(Guid advogadoId)
        {
            var advogado = await _advogadoRepository.ObterPorId(advogadoId);

            if (advogado == null)
            {
                throw new ErrorValidationException("Advogado não encontrado!");
            }

            return _mapper.Map<AdvogadoDto>(advogado);
        }

        public async Task Inserir(AdvogadoDto advogadoDto)
        {
            try
            {
                var endereco = new Endereco(advogadoDto.Endereco.Logradouro, advogadoDto.Endereco.Bairro, advogadoDto.Endereco.Estado,
                                            advogadoDto.Endereco.CEP, advogadoDto.Endereco.Numero, advogadoDto.Endereco.Complemento);

                var advogado = new Advogado(advogadoDto.Nome, advogadoDto.DataDeNascimento, advogadoDto.Email, endereco, advogadoDto.Senioridade);

                if (!advogado.EhValido())
                {
                    string? mensagem = advogado.MensagemValidacao();
                    throw new ErrorValidationException(mensagem ?? "Erro não identificado ao criar o Advogado");
                }

                await _advogadoRepository.Inserir(advogado);
            }
            catch (Exception ex)
            {
                throw new ErrorValidationException($"Erro ao inserrir Advogado! {ex.Message}");
            }
        }

        public async Task Atualizar(Guid advogadoId, AdvogadoDto advogadoDto)
        {
            try
            {
                var advogado = await _advogadoRepository.ObterPorId(advogadoId);

                if (advogado != null)
                {
                    advogado.Nome = advogadoDto.Nome;
                    advogado.DataDeNascimento = advogadoDto.DataDeNascimento;
                    advogado.Email = advogadoDto.Email;
                    advogado.Senioridade = advogadoDto.Senioridade;
                    advogado.Endereco.Logradouro = advogadoDto.Endereco.Logradouro;
                    advogado.Endereco.Bairro = advogadoDto.Endereco.Bairro;
                    advogado.Endereco.Estado = advogadoDto.Endereco.Estado;
                    advogado.Endereco.Cep = advogadoDto.Endereco.CEP;
                    advogado.Endereco.Numero = advogadoDto.Endereco.Numero;
                    advogado.Endereco.Complemento = advogadoDto.Endereco.Complemento;
                    advogado.Senioridade = advogadoDto.Senioridade;
                }
                else
                {
                    throw new ErrorValidationException("Advogado não encontrado!");
                }

                await _advogadoRepository.Atualizar(advogado);
            }
            catch (Exception ex)
            {
                throw new ErrorValidationException($"Erro ao atualizar Advogado! {ex.Message}");
            }
        }

        public async Task Excluir(Guid advogadoId)
        {
            var advogado = await _advogadoRepository.ObterPorId(advogadoId) ?? throw new ErrorValidationException("Advogado não encontrado!");

            await _advogadoRepository.Excluir(advogado);
        }
    }
}
