using System.Linq;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection addApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();

            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));


            services.Configure<ApiBehaviorOptions>(option =>
           {

               option.InvalidModelStateResponseFactory = ActionContext =>
               {

                   var errors = ActionContext.ModelState
                   .Where(e => e.Value.Errors.Count > 0)
                   .SelectMany(x => x.Value.Errors)
                   .Select(x => x.ErrorMessage).ToArray();

                   var errorRes = new ApiValidationErrorResponse
                   {
                       Errors = errors
                   };

                   return new BadRequestObjectResult(errorRes);
               };

           });
            return services;

        }

    }
}