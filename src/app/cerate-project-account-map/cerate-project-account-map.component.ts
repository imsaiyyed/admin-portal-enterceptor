import { Component, OnInit } from '@angular/core';
import { AccountDetails } from '../models/AccountDetails';
import { ProjectDetails } from '../models/ProjectDetails';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountDetailsService } from '../services/account-service/account-details.service';
import { ProjectDetailsService } from '../services/project-service/project-details.service';
import { ProjectAccountService } from '../services/project-account/project-account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cerate-project-account-map',
  templateUrl: './cerate-project-account-map.component.html',
  styleUrls: ['./cerate-project-account-map.component.scss']
})
export class CerateProjectAccountMapComponent implements OnInit {
  accounts:AccountDetails[];
  projects:ProjectDetails[];
  projectAccountDetails;
  constructor(private fb: FormBuilder,
    private accountDetailsService: AccountDetailsService,
    private projectDetailsService:ProjectDetailsService,
    private projectAccountService:ProjectAccountService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar,) { }
  
  
  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));

    this.accountDetailsService.initAccounts().subscribe((resp)=>{
      this.accountDetailsService.ACCOUNT_DATA=resp.body;
      this.accounts=resp.body;
    });
    this.projectDetailsService.initProjects().subscribe((resp)=>{
      this.projectDetailsService.PROJECT_DATA=resp.body;
      this.projects=resp.body;
    });
    // "Id": 3,
    //     "ProjectId": 3,
    //     "ProjectTitle": "ECPQ",
    //     "AccountId": 3,
    //     "AccountName": "Salesforce",
    //     "StartDate": null,
    //     "EndDate": null,
    //     "Renewable": false,
    //     "RenewalDate": null,
    //     "IsActive": true,
    //     "UserId": 1
    if (id == 0) {
      this.projectAccountDetails = this.fb.group({
        Id:[0],
        UserId: [1],
        StartDate: ["",Validators.required],
        EndDate:["",[Validators.required]],
        Renewable:[true,[Validators.required]],
        RenewalDate:["",[Validators.required]],
        ProjectId:[0,[Validators.required]],
        AccountId:[0,[Validators.required]],
        IsActive:[true]
      });
    }else{

    }
  }

}
