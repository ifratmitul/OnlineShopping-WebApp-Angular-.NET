
using Core.Entities;

namespace Core.Specification
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParam)
        : base(x =>
        (string.IsNullOrEmpty(productParam.Search) || x.Name.ToLower().Contains(productParam.Search)) &&
        (!productParam.BrandId.HasValue || x.ProductBrandId == productParam.BrandId) &&
                      !productParam.TypeId.HasValue || x.ProductTypeId == productParam.TypeId)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParam.PageSize * (productParam.PageIndex - 1), productParam.PageSize);

            if (!string.IsNullOrEmpty(productParam.Sort))
            {
                switch (productParam.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }

            }
        }

        public ProductsWithTypesAndBrandsSpecification(int id) :
        base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}