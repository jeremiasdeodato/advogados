using AdvogadosApi.Application.DTOs;
using AdvogadosApi.Domain.Entidades;
using AutoMapper;

namespace AdvogadosApi.Application.AutoMapper
{
    public class Profiles : Profile
    {
        public Profiles()
        {
            CreateMap<Advogado, AdvogadoDto>();
            CreateMap<Endereco, EnderecoDto>();
            CreateMap<Advogado, ListaAdvogadoDto>()
                .ForMember(dest => dest.DataDeNascimento,
                           opt => opt.MapFrom(src => src.DataDeNascimento.Date));
        }
    }
}
