import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './models/Pagination';
import { IProduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  product: IProduct[];

  constructor(private http: HttpClient ) {  }

  ngOnInit(){

    this.http.get('https://localhost:5001/api/products').subscribe((response : IPagination) => 
    {
        console.log(response);
        this.product = response.data;
    }, 
    error => 
    {
        console.log(error);
    })
  }
}
