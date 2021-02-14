import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServiceService } from '../account-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup

  constructor(private accountService : AccountServiceService, private route: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }


  onSubmit(){

    this.accountService.login(this.loginForm.value).subscribe (() => {
      this.route.navigateByUrl('/shop');
    }, err => {
      console.log(err);
      
    })
  //console.log(this.loginForm.value);
  
  }

}
