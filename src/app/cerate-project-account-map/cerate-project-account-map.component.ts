import { Component, OnInit, Inject } from "@angular/core";
import { AccountDetails } from "../models/AccountDetails";
import { ProjectDetails } from "../models/ProjectDetails";
import { FormBuilder, Validators } from "@angular/forms";
import { AccountDetailsService } from "../services/account-service/account-details.service";
import { ProjectDetailsService } from "../services/project-service/project-details.service";
import { ProjectAccountService } from "../services/project-account/project-account.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { ProjectAccountMap } from "../models/ProjectAccountMap";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: "app-cerate-project-account-map",
  templateUrl: "./cerate-project-account-map.component.html",
  styleUrls: ["./cerate-project-account-map.component.css"]
})
export class CerateProjectAccountMapComponent implements OnInit {
  accounts: AccountDetails[];
  projects: ProjectDetails[];
  projectAccountDetails = this.fb.group({});
  isEdit = false;
  projectaccountMap: ProjectAccountMap;
  constructor(
    private fb: FormBuilder,
    private accountDetailsService: AccountDetailsService,
    private projectDetailsService: ProjectDetailsService,
    private projectAccountService: ProjectAccountService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CerateProjectAccountMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    let paraEdit = this.data['isEdit'];
    console.log(paraEdit);
    if (paraEdit == "true") {
      this.isEdit = true;
    }
    this.accountDetailsService.initAccounts().subscribe(resp => {
      this.accountDetailsService.ACCOUNT_DATA = resp.body;
      this.accounts = resp.body;
    });
    this.projectDetailsService.initProjects().subscribe(resp => {
      this.projectDetailsService.PROJECT_DATA = resp.body;
      this.projects = resp.body;
    });

    if (this.isEdit) {
      let Id = this.data['ProjectId'];
      this.projectaccountMap = this.projectAccountService.getMapping(Id);
      this.projectAccountDetails = this.fb.group({
        Id: [Id],
        UserId: [1],
        StartDate: ["", Validators.required],
        EndDate: ["", [Validators.required]],
        Renewable: [this.projectaccountMap.Renewable, [Validators.required]],
        RenewalDate: ["",
          [Validators.required]
        ],
        ProjectId: [this.projectaccountMap.ProjectId, [Validators.required]],
        AccountId: [this.projectaccountMap.AccountId, [Validators.required]],
        IsActive: [this.projectaccountMap.IsActive]
      });

      let startDate=new Date(this.projectaccountMap.StartDate);
      let endDate=new Date(this.projectaccountMap.EndDate);

      this.projectAccountDetails.get('StartDate').setValue(startDate.toISOString().slice(0,10));
      this.projectAccountDetails.get('EndDate').setValue(endDate.toISOString().slice(0,10));

      
      if (this.projectAccountDetails.get("Renewable").value) {
        this.projectAccountDetails.get("RenewalDate").enable();
        let renewalDate=new Date(this.projectaccountMap.RenewalDate);
        this.projectAccountDetails.get('RenewalDate').setValue(renewalDate.toISOString().slice(0,10));

      } else {
        this.projectAccountDetails.get("RenewalDate").disable();
      }
    } else {
      //let record=this.projectAccountService.getMapping(id);
      let projectId =this.data['ProjectId'];

      this.projectAccountDetails = this.fb.group({
        Id: [0],
        UserId: [1],
        StartDate: ["", Validators.required],
        EndDate: ["", [Validators.required]],
        Renewable: [true, [Validators.required]],
        RenewalDate: ["", [Validators.required]],
        ProjectId: [projectId, [Validators.required]],
        AccountId: [0, [Validators.required]],
        IsActive: [true]
      });
    }

    this.onChanges();
  }

  onChanges(): void {
    this.projectAccountDetails.get("Renewable").valueChanges.subscribe(val => {
      console.log(val);
      if (!val) {
        this.projectAccountDetails.get("RenewalDate").disable();
      } else {
        this.projectAccountDetails.get("RenewalDate").enable();
      }
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this.projectAccountService
        .updateMapping(this.projectAccountDetails.value)
        .subscribe(
          resp => {
            console.log(resp);
          },
          error => {
            console.log("Erro", error);
            if (error.statusText == "Created") {
              this.snackBar.open("Record updated successfully...", "Ok", {
                duration: 3000
              });
              this.router.navigate([
                "/project-details/project-profile/",
                this.projectaccountMap.ProjectId
              ]);
              this.dialogRef.close();
            }
          }
        );
    } else {
      let id = this.data['ProjectId'];
      console.log(this.projectAccountDetails.value);
      this.projectAccountService
        .addMapping(this.projectAccountDetails.value)
        .subscribe(
          resp => {
            console.log(resp);
          },
          error => {
            console.log("Erro", error);
            if (error.statusText == "Created") {
              this.snackBar.open("Record added successfully...", "Ok", {
                duration: 3000
              });
              this.router.navigate(["/project-details/project-profile/", id]);
              this.dialogRef.close();
            }
          }
        );
    }
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
