import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/Pagination';
import { IType } from '../shared/models/productType';
import {map} from 'rxjs/operators';
import { ShopParams } from '../shared/models/ShopParams';
import { IProduct } from '../shared/models/product';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getProducts(shopParam:ShopParams){
    let params = new HttpParams();
    if(shopParam.brandId !== 0)
    {
      params = params.append('brandId', shopParam.brandId.toString());
    }

    if(shopParam.typeId !== 0)
    {
      params = params.append('typeId', shopParam.typeId.toString());
    }
    if(shopParam.search)
    {
      params = params.append('search', shopParam.search);
    }
    
      params = params.append('sort', shopParam.sort);
      params = params.append('pageIndex',shopParam.pageNumber.toString())
      params = params.append('pageIndex',shopParam.pageSize.toString())
    

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe:'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    )
  }

  getbrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'products/brands');
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'products/types');
  }

  getProduct(id:number)
  {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }


}