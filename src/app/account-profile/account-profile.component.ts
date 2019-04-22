import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AccountDetailsService } from "../services/account-service/account-details.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AccountDetails } from "../models/AccountDetails";
import {MatSnackBar, MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ClientDetails } from '../models/ClientDetails';
import { ClientDetailsService } from '../services/client-service/client-details.service';
import { CreateProjectClientMapComponent } from '../create-project-client-map/create-project-client-map.component';
@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {
  accountDetails ;
  isLoading = false;
  isEdit=false;
  filteredClients=new Array<ClientDetails>();
  displayedColumns: string[] ;
  dataSource ;
  selection = new SelectionModel<ClientDetails>(true, []);
  account: AccountDetails;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private fb: FormBuilder,
    private accountDetailsService: AccountDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar,
    public dialog: MatDialog,
    private clientDetailsService:ClientDetailsService
  ) {

  }

  ngOnInit() {
    let accountId = parseInt(this.route.snapshot.paramMap.get("accountId"));
    // if (accountId == 0) {
    //   this.accountDetails = this.fb.group({
    //     AccountId:[0],
    //     AccountName: ["", [Validators.required]],
    //     UserId: [1],
    //     IsActive: ["",Validators.required]
    //   });
    // } else {
      this.isEdit=true;
      
      this.account = this.accountDetailsService.getAccount(accountId);
      console.log(this.account);

      this.accountDetails = this.fb.group({
        AccountId:[this.account.AccountId],
        AccountName: [this.account.AccountName, [Validators.required]],
        UserId: [this.account.UserId],
        IsActive: [this.account.IsActive,Validators.required]
      });


    // }
    let tempData;
    this.clientDetailsService.initClients().subscribe((resp)=>{
      // PROJECT_DATA=resp.body;
      console.log('init',resp.body);
      tempData=resp.body;
      tempData.forEach(client => {
        if(client.AccountId==this.account.AccountId){
          this.filteredClients.push(client);
        }
      });
      this.clientDetailsService.CLIENT_DATA=resp.body;
      this.dataSource = new MatTableDataSource<ClientDetails>(this.filteredClients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.displayedColumns= ['Id','ClientEmail', 'Designation','ClientName','IsActive','edit','delete','project'];
  }
  linkProject(client){
    let dialogRef=this.dialog.open(CreateProjectClientMapComponent, {
      width: '600px',
      data: {Client:client}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onSubmit() {
    console.log(this.accountDetails.value);
    let accountId = parseInt(this.route.snapshot.paramMap.get("accountId"));
    // if (accountId == 0) {
    // this.accountDetailsService.addAccount(this.accountDetails.value).subscribe((resp)=>{
    //   console.log('Response',resp);
    // },(error)=>{
    //   console.log('Error',error)
    //   if(error.statusText=='Created'){
    //     this.snackBar.open('Account added successfully...', 'Ok', {
    //       duration: 3000
    //     });
    //     this.router.navigate(['/account-details']);
    //   }
    // })
   
      
    // }
    // else{
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
    // }
   
  }
}
