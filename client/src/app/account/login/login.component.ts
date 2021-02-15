import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServiceService } from '../account-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup
  returnUrl :string;

  constructor(private accountService : AccountServiceService, private route: Router, private activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.returnUrl = this.activateRoute.snapshot.queryParams.returnUrl || '/shop'
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', [Validators.required])
    })
  }


  onSubmit(){

    this.accountService.login(this.loginForm.value).subscribe (() => {
      this.route.navigateByUrl(this.returnUrl);
    }, err => {
      console.log(err);
      
    })
  //console.log(this.loginForm.value);
  
  }

}
