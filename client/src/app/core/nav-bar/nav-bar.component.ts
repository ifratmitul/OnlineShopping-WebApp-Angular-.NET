import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountServiceService } from 'src/app/account/account-service.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private basketService : BasketService, private accountService : AccountServiceService) { }

  basket$ : Observable<IBasket>
  currentUser$: Observable<IUser>

  ngOnInit(): void {

    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$
  }

  logout(){
    this.accountService.logout();
  }

}
