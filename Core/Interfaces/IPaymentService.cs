using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IPaymentService
    {
        Task<CustomerBasket> createOrUpdatePaymentIntent(string basketId);
    }
}