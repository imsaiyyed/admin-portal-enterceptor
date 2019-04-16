import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AccountDetailsService } from "../services/account-service/account-details.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AccountDetails } from "../models/AccountDetails";
import {MatSnackBar} from '@angular/material';
import { ClientDetailsService } from '../services/client-service/client-details.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  clientDetails;
  isEdit=false;
  accounts:AccountDetails[];
  influence=[{Title:'HIHI',Value:1.06},{Title:'HILI',Value:1.04},{Title:'LIHI',Value:1.02},{Title:'LILI',Value:1}];
//   Id:number;
//   AccountId:number;
//   ClientEmail:String;
//   ClientName:String;
//   Designation:String;
//   Influence:number;
//   AllowMonitoring:boolean;
//   UserId:number;
//   IsActive:boolean;
  constructor( private fb: FormBuilder,
    private accountDetailsService: AccountDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar,
  private clientDetailsService:ClientDetailsService) { }

  ngOnInit() {
    let clientId = parseInt(this.route.snapshot.paramMap.get("clientId"));
    this.accountDetailsService.initAccounts().subscribe((resp)=>{
      this.accountDetailsService.ACCOUNT_DATA=resp.body;
      this.accounts=resp.body;
    });
    if (clientId == 0) {
      this.clientDetails = this.fb.group({
        Id:[0],
        ClientName: ["", [Validators.required]],
        UserId: [1],
        ClientEmail: ["",Validators.required],
        AllowMonitoring:[true,[Validators.required]],
        Designation:["",[Validators.required]],
        Influence:[0,[Validators.required]],
        AccountId:[0,[Validators.required]],
        IsActive:[true]
      });
    } else {
      this.isEdit=true;
      let client=this.clientDetailsService.getClient(clientId);
      this.clientDetails = this.fb.group({
        Id:[clientId],
        ClientName: [client.ClientName, [Validators.required]],
        UserId: [client.UserId],
        ClientEmail: [client.ClientEmail,Validators.required],
        AllowMonitoring:[true,[Validators.required]],
        Designation:[client.Designation,[Validators.required]],
        Influence:[client.Influence,[Validators.required]],
        AccountId:[client.AccountId,[Validators.required]],
        IsActive:[client.IsActive],
      });
    }
  }
  onSubmit(){
    console.log(this.clientDetails.value);
    let clientId = parseInt(this.route.snapshot.paramMap.get("clientId"));
    if(clientId==0){
      this.clientDetailsService.addClient(this.clientDetails.value).subscribe((resp)=>{
        console.log(resp);
      },(error)=>{
        console.log('Erro',error);
        if(error.statusText=='Created'){
          this.snackBar.open('Client added successfully...', 'Ok', {
            duration: 3000
          });
          this.router.navigate(['/client-details']);
        }
      });
    }
    else{
      this.clientDetailsService.updateClient(this.clientDetails.value).subscribe((resp)=>{
        console.log(resp);
      },(error)=>{
        console.log('Erro',error);
        if(error.statusText=='Created'){
          this.snackBar.open('Client updated successfully...', 'Ok', {
            duration: 3000
          });
          this.router.navigate(['/client-details']);
        }
      });  
    }
 
  }

}
