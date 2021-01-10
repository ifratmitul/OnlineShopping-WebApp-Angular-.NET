import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  baseUrl  = environment.apiUrl;
  validationError:any;
  constructor(private http : HttpClient) { }
  
  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl+'products/435').subscribe( res => {
      console.log(res)
    }, err => {
      console.log(err);
    });
  }

  get500Error(){
    this.http.get(this.baseUrl+'buggy/servererror').subscribe( res => {
      console.log(res)
    }, err => {
      console.log(err);
    });
  }

  get400Error(){
    this.http.get(this.baseUrl+'buggy/badrequest').subscribe( res => {
      console.log(res)
    }, err => {
      console.log(err);
    });
  }

  get400validationError(){
    this.http.get(this.baseUrl+'products/fortytwo').subscribe( res => {
      console.log(res)
    }, err => {
      console.log(err);
      this.validationError = err.errors;
    });
  }



}
