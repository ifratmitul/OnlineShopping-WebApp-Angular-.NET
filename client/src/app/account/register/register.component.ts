import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

import { AccountServiceService } from '../account-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor(private fb:FormBuilder, private accountService : AccountServiceService, private  routes : Router) { }
  errors : string [];
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      displayName : [null, [Validators.required] ],
      email: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
      [this.validateEmailNotTaken()]],
      password: [null, [Validators.required]]
    })
  }

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe( res => {
      this.routes.navigateByUrl('/shop')
    }, err => {
      console.log(err);
      this.errors = err.errors;
      
    })
    
  }

  validateEmailNotTaken() : AsyncValidatorFn{
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if(!control.value) return of(null)

          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? {emailExists : true } : null;
            })
          );
        })
      );
    };
  }

}
