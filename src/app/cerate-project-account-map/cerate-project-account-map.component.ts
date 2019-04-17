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
  styleUrls: ['./cerate-project-account-map.component.css']
})
export class CerateProjectAccountMapComponent implements OnInit {
  accounts:AccountDetails[];
  projects:ProjectDetails[];
  projectAccountDetails=this.fb.group({});
  isEdit=false;
  constructor(private fb: FormBuilder,
    private accountDetailsService: AccountDetailsService,
    private projectDetailsService:ProjectDetailsService,
    private projectAccountService:ProjectAccountService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar,) { }
  
  
  ngOnInit() {
    let projectId = parseInt(this.route.snapshot.paramMap.get("id"));

    this.accountDetailsService.initAccounts().subscribe((resp)=>{
      this.accountDetailsService.ACCOUNT_DATA=resp.body;
      this.accounts=resp.body;
    });
    this.projectDetailsService.initProjects().subscribe((resp)=>{
      this.projectDetailsService.PROJECT_DATA=resp.body;
      this.projects=resp.body;
    });

    if (projectId == 0) {
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
      //let record=this.projectAccountService.getMapping(id);

      this.projectAccountDetails = this.fb.group({
        Id:[0],
        UserId: [1],
        StartDate: ["",Validators.required],
        EndDate:["",[Validators.required]],
        Renewable:[true,[Validators.required]],
        RenewalDate:["",[Validators.required]],
        ProjectId:[projectId,[Validators.required]],
        AccountId:[0,[Validators.required]],
        IsActive:[true]
      });
    }

    this.onChanges();

  }

  onChanges(): void {
    this.projectAccountDetails
      .get("Renewable")
      .valueChanges.subscribe(val => {
        console.log(val);
        if(!val){
          this.projectAccountDetails
          .get("RenewalDate").disable();
        }
        else{
          this.projectAccountDetails
          .get("RenewalDate").enable();
        }
        
      });
    }

    onSubmit(){
      let id = parseInt(this.route.snapshot.paramMap.get("id"));
      console.log(this.projectAccountDetails.value);
      // if(id==0){
      this.projectAccountService.addMapping(this.projectAccountDetails.value).subscribe((resp)=>{
        console.log(resp);
      },(error)=>{
        console.log('Erro',error);
        if(error.statusText=='Created'){
          this.snackBar.open('Record added successfully...', 'Ok', {
            duration: 3000
          });
          this.router.navigate(['/project-details/project-profile/',id]);
        }
      });
    // }else{
    //   this.projectAccountService.updateMapping(this.projectAccountDetails.value).subscribe((resp)=>{
    //     console.log(resp);
    //   },(error)=>{
    //     console.log('Erro',error);
    //     if(error.statusText=='Created'){
    //       this.snackBar.open('Record added successfully...', 'Ok', {
    //         duration: 3000
    //       });
    //       this.router.navigate(['/project-account']);
    //     }
    //   });
    // }

    }

}
