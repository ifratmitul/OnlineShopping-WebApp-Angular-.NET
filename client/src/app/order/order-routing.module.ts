import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const route :Routes = [
  {path: '', component: OrderComponent},
  {path:':id', component: OrderDetailsComponent, data:{breadcrumb:{alias:'OrderDetails'}}}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(route)
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
