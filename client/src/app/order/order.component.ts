import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { OrderService } from './order.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders : IOrder[]
  constructor(private OrderService : OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.OrderService.getOrdersForUser().subscribe((res: IOrder[]) =>{
      this.orders = res;
    }, err =>{
      console.log(err);
      
    })
  }

}
