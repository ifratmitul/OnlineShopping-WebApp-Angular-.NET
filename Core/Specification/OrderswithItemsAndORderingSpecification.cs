using System;
using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specification
{
    public class OrderswithItemsAndORderingSpecification : BaseSpecification<Order>
    {
        public OrderswithItemsAndORderingSpecification(string email) : base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItem);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrderswithItemsAndORderingSpecification(int id, string email)
        : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItem);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}