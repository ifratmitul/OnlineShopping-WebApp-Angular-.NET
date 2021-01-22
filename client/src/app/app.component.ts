import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { IPagination } from './shared/models/Pagination';
import { IProduct } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  

  constructor(private basketService : BasketService) {  }

  ngOnInit(){

  const basketId = localStorage.getItem('basket_id');
  console.log(basketId);
 if(basketId)
 {
   this.basketService.getBasket(basketId).subscribe(() => {
     console.log('Initialize');
   },
   err =>{
     console.log(err);
   })


  }

  }

}