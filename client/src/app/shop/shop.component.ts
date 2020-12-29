import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/Pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/ShopParams';
import { ShopService } from './shop.service';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm : ElementRef;
  products : IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParam = new ShopParams();
  totalCount :number;
    sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ]
  constructor(private shopService:ShopService) { }

  ngOnInit(): void {


      this.getProducts();
      this.getBrands();
      this.getType();
  }

  getProducts(){

    this.shopService.getProducts(this.shopParam).subscribe((response) =>{
      this.products = response.data;
      this.shopParam.pageNumber = response.pageIndex;
      this.shopParam.pageSize = response.pageSize;
      this.totalCount = response.count;
      
    },
    error => {
      console.log(error);
    }
    )
  }

  getBrands(){

    this.shopService.getbrands().subscribe((Response) => {
        this.brands = [{id: 0, name: 'All'}, ...Response]
    },
    err => {
      console.log(err)
    })

  }

  getType(){

    this.shopService.getTypes().subscribe(res =>
      {
        this.types = [{id: 0, name: 'All'}, ...res]
      },
      err =>{
        console.log(err);
      })

  }

  onBrandSelected(brandId:number){
    this.shopParam.brandId = brandId;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId:number){
    this.shopParam.typeId = typeId;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort:string){

    this.shopParam.sort = sort;
    this.getProducts();

  }

  onPageChanged(event:any){

    if(this.shopParam.pageNumber != event){

      this.shopParam.pageNumber = event.page;
      this.getProducts();
    }

  }

  onSearch(){
    this.shopParam.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParam = new ShopParams();
    this.getProducts();
  }



}
