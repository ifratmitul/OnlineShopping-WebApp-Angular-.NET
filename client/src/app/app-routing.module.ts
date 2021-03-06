import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServeErrorComponent } from './core/serve-error/serve-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'', component: HomeComponent, data:{breadcrumb: 'Home'}},
  {path:'test-error', component: TestErrorComponent, data:{breadcrumb: 'Test Errors'}},
  {path:'server-error', component: ServeErrorComponent,data:{breadcrumb: 'Server error'}},
  {path:'not-found', component: NotFoundComponent, data:{breadcrumb: 'Not Found'}},
  {path:'shop', loadChildren: () => import('./shop/shop.module').then( mod => mod.ShopModule), data:{breadcrumb: 'Shop'}},
  {path:'basket', loadChildren: () => import('./basket/basket.module').then( mod => mod.BasketModule), data:{breadcrumb: 'Basket'}},
  {path:'checkout',canActivate: [AuthGuard] ,loadChildren: () => import('./checkout/checkout.module').then( mod => mod.CheckoutModule), data:{breadcrumb: 'Checkout'}},
  {path:'account', loadChildren: () => import('./account/account.module').then( mod => mod.AccountModule), data:{breadcrumb: {skip:true}}},

  {path:'order', canActivate: [AuthGuard], loadChildren: () => import('./order/order.module').then( mod => mod.OrderModule), data:{breadcrumb: 'Orders'}},

  {path: '**', redirectTo:'not-found', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
