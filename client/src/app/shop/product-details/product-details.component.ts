import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private shopService:ShopService, private activatedRoute: ActivatedRoute, private bcService :BreadcrumbService) {

    this.bcService.set('@productDetails', '');
   }
  product: IProduct;
  
  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct()
  {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(res => {
      this.product = res;
      console.log(res);
      this.bcService.set('@productDetails', this.product.name)
    }, err => {
      console.log(err);
    })
  }

}
