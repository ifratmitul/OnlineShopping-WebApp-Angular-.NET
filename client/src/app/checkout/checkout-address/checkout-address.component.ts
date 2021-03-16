import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountServiceService } from 'src/app/account/account-service.service';
import { IAddress } from 'src/app/shared/models/address';

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
    this.accountS.updateUserAddress(this.checkoutForm.get('addressForm').value).subscribe((address:IAddress) =>{
      this.toastr.success('Address Saved')
      this.checkoutForm.get('addressForm').reset(address);
    }, err => {
      this.toastr.error(err.message);
      console.log(err);
      

    })
  }

}
