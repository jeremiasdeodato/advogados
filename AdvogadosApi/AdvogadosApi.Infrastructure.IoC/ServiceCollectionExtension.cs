using AdvogadosApi.Application.AutoMapper;
using AdvogadosApi.Application.Interfaces;
using AdvogadosApi.Application.Services;
using AdvogadosApi.Infrastructure.Interfaces;
using AdvogadosApi.Infrastructure.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AdvogadosApi.Infrastructure.IoC
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
            RegisterApplication(services);
            RegisterRepositories(services);

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddAutoMapper(typeof(Profiles));

            return services;
        }

        public static IServiceCollection ConfigureDatabases(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionStringMysql = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContextPool<AppDbContext>(options =>
                            options.UseMySql(connectionStringMysql,
            ServerVersion.AutoDetect(connectionStringMysql)));
            return services;
        }

        private static void RegisterRepositories(IServiceCollection services)
        {
            services.AddScoped<IAdvogadoRepository, AdvogadoRepository>();
        }
        
        private static void RegisterApplication(IServiceCollection services)
        {
            services.AddScoped<IAdvogadoService, AdvogadoService>();
        }
    }
}
