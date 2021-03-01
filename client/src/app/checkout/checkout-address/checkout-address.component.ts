import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountServiceService } from 'src/app/account/account-service.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
@Input() checkoutForm : FormGroup;


  constructor(private accountS: AccountServiceService, private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  saveUserAddress(){
    this.accountS.updateUserAddress(this.checkoutForm.get('addressForm').value).subscribe(() =>{
      this.toastr.success('Address Saved')
    }, err => {
      this.toastr.error(err.message);
      console.log(err);
      

    })
  }

}
