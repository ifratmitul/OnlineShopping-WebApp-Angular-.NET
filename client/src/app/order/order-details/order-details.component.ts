import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
order : IOrder
  constructor(
    private route : ActivatedRoute,
    private breadCrumb : BreadcrumbService,
    private orderService: OrderService
  ) {
    this.breadCrumb.set('@OrderDetailed', '');
   }

  ngOnInit(): void {
    this.orderService.getOrderDetails(+this.route.snapshot.paramMap.get('id'))
                      .subscribe((res :IOrder) => {
                        this.order = res;
                        this.breadCrumb.set('@OrderDetailed', `Order# ${res.id} - ${res.status}`)
                      },
                      err =>{
                        console.log(err);
                        
                      })
  }

}
