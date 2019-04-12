import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AccountDetailsService } from "../services/account-service/account-details.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AccountDetails } from "../models/AccountDetails";
@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.css"]
})
export class CreateAccountComponent implements OnInit {
  accountDetails = this.fb.group({
    accountName: ["", [Validators.required]],
    userId: [1],
    isActive: ["",Validators.required]
  });
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private accountDetailsService: AccountDetailsService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    let accountId = parseInt(this.route.snapshot.paramMap.get("accountId"));
    if (accountId == 0) {
      this.accountDetails = this.fb.group({
        accountId:[0],
        accountName: ["", [Validators.required]],
        userId: [1],
        isActive: ["",Validators.required]
      });
    } else {
      let account: AccountDetails;
      account = this.accountDetailsService.getAccount(accountId);
      this.accountDetails = this.fb.group({
        accountId:[account.AccountId],
        accountName: [account.AccountName, [Validators.required]],
        userId: [account.UserId],
        isActive: [account.IsActive,Validators.required]
      });
    }
  }

  onSubmit() {
    console.log(this.accountDetails.value);
    let accountId = parseInt(this.route.snapshot.paramMap.get("accountId"));
    if (accountId == 0) {
      console.log(
        this.accountDetailsService.addAccount(this.accountDetails.value)
      );
    }
    else{
     
    }
   
  }
}
