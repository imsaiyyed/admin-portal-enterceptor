import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AccountDetailsService } from "../services/account-service/account-details.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AccountDetails } from "../models/AccountDetails";
import {MatSnackBar} from '@angular/material';

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.css"]
})
export class CreateAccountComponent implements OnInit {
  accountDetails ;
  isLoading = false;
  isEdit=false;
  constructor(
    private fb: FormBuilder,
    private accountDetailsService: AccountDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar
  ) {

  }

  ngOnInit() {
    let accountId = parseInt(this.route.snapshot.paramMap.get("accountId"));
    if (accountId == 0) {
      this.accountDetails = this.fb.group({
        AccountId:[0],
        AccountName: ["", [Validators.required]],
        UserId: [1],
        IsActive: [true,Validators.required]
      });
    } else {
      this.isEdit=true;
      let account: AccountDetails;
      account = this.accountDetailsService.getAccount(accountId);
      console.log(account);

      this.accountDetails = this.fb.group({
        AccountId:[account.AccountId],
        AccountName: [account.AccountName, [Validators.required]],
        UserId: [account.UserId],
        IsActive: [account.IsActive,Validators.required]
      });
    }
  }

  onSubmit() {
    console.log(this.accountDetails.value);
    let accountId = parseInt(this.route.snapshot.paramMap.get("accountId"));
    if (accountId == 0) {
    this.accountDetailsService.addAccount(this.accountDetails.value).subscribe((resp)=>{
      console.log('Response',resp);
    },(error)=>{
      console.log('Error',error)
      if(error.statusText=='Created'){
        this.snackBar.open('Account added successfully...', 'Ok', {
          duration: 3000
        });
        this.router.navigate(['/account-details']);
      }
    })
   
      
    }
    else{
      this.accountDetailsService.updateAccount(this.accountDetails.value).subscribe((resp)=>{
        console.log('Response',resp);
      },(error)=>{
        if(error.statusText=='Created'){
          this.snackBar.open('Account updated successfully...', 'Ok', {
            duration: 3000
          });
          this.router.navigate(['/account-details']);
        }
        console.log('Error',error)
      });
    }
   
  }
}
