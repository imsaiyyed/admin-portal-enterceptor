import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ProjectDetailsService } from "../services/project-service/project-details.service";
import { ProjectAccountService } from "../services/project-account/project-account.service";
import { AccountDetailsService } from "../services/account-service/account-details.service";
import { ProjectDetails } from "../models/ProjectDetails";
import { AccountDetails } from "../models/AccountDetails";
import { ClientDetails } from "../models/ClientDetails";
import { ClientDetailsService } from "../services/client-service/client-details.service";
import { FormBuilder, Validators } from "@angular/forms";
import { EmployeeDetailsService } from "../services/employee-service/employee-details.service";
import { ProjectClientService } from "../services/project-client/project-client.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ProjectAccountMap } from "../models/ProjectAccountMap";
import { ProjectClientMap } from "../models/ProjectClientMap";

@Component({
  selector: "app-create-project-client-map",
  templateUrl: "./create-project-client-map.component.html",
  styleUrls: ["./create-project-client-map.component.css"]
})
export class CreateProjectClientMapComponent implements OnInit {
  projects = new Array<ProjectDetails>();
  accounts: AccountDetails[];
  clients = new Array<ClientDetails>();
  projectAccountDetails:ProjectAccountMap[];
  projectClientMap:ProjectClientMap[];

  projectClientDetails = this.fb.group({});
  client: ClientDetails;
  isEdit = false;
  isProjectDisabled=false;
  isClientDisabled=false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectDetailsService: ProjectDetailsService,
    private accountDetailsService: AccountDetailsService,
    private clientDetailsService: ClientDetailsService,
    private projectClientService: ProjectClientService,
    private projectAccountService: ProjectAccountService,
    public dialogRef: MatDialogRef<CreateProjectClientMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    let tempData:ClientDetails[];
    // let projectId = parseInt(this.route.snapshot.paramMap.get("projectId"));
    // let accountId = parseInt(this.route.snapshot.paramMap.get("accountId"));
    this.client=this.data['Client'];
    if(this.client){
      this.isProjectDisabled=false;
      this.isClientDisabled=true;
      console.log(this.client)

      this.projectClientService.initMapping().subscribe((resp)=>{
        this.projectClientMap=resp.body;
      });

      this.projectAccountService.initMaaping().subscribe((resp)=>{
        this.projectAccountDetails=resp.body;
        this.projectDetailsService.initProjects().subscribe(resp => {
          this.projectDetailsService.PROJECT_DATA = resp.body;

          this.projectAccountDetails.forEach((projectAccount,index)=>{
            if(projectAccount.AccountId==this.client.AccountId){
              this.projects.push(this.projectDetailsService.getProject(projectAccount.ProjectId));
            }
          });
        });
      }); 

      this.accountDetailsService.initAccounts().subscribe(resp => {
        this.accountDetailsService.ACCOUNT_DATA = resp.body;
        this.accounts = resp.body;
      });
      
      this.clientDetailsService.initClients().subscribe(resp => {
        this.clientDetailsService.CLIENT_DATA = resp.body;
        tempData = resp.body;
        tempData.forEach(client => {
          if (client.AccountId == client.AccountId) {
            this.clients.push(client);
          }
        });
      });
      this.projectClientDetails = this.fb.group({
        Id: [0],
        UserId: [1],
        StartDate: ["", Validators.required],
        EndDate: ["", [Validators.required]],
        ProjectId: ["", [Validators.required]],
        AccountId: [this.client.AccountId, [Validators.required]],
        ClientId: [this.client.Id, Validators.required],
        IsActive: [true]
      });
    }
    else{
      this.isProjectDisabled=true;
      this.isClientDisabled=false;
    let projectId = this.data["ProjectId"];
    let accountId = this.data["AccountId"];
    this.accountDetailsService.initAccounts().subscribe(resp => {
      this.accountDetailsService.ACCOUNT_DATA = resp.body;
      this.accounts = resp.body;
    });
    this.projectDetailsService.initProjects().subscribe(resp => {
      this.projectDetailsService.PROJECT_DATA = resp.body;
      this.projects = resp.body;
    });
    this.clientDetailsService.initClients().subscribe(resp => {
      this.clientDetailsService.CLIENT_DATA = resp.body;
      tempData = resp.body;
      tempData.forEach(client => {
        if (client.AccountId == accountId) {
          this.clients.push(client);
        }
      });
    });

    this.projectClientDetails = this.fb.group({
      Id: [0],
      UserId: [1],
      StartDate: ["", Validators.required],
      EndDate: ["", [Validators.required]],
      ProjectId: [projectId, [Validators.required]],
      AccountId: [accountId, [Validators.required]],
      ClientId: [0, Validators.required],
      IsActive: [true]
    });
    console.log(projectId);
    console.log(accountId);
    }
    
  }
  onSubmit() {
    console.log(this.projectClientDetails.value);
    this.projectClientService
      .addMapping(this.projectClientDetails.value)
      .subscribe(
        resp => {
          console.log(resp);
        },
        error => {
          console.log(error);
          if (error.statusText == "Created") {
            this.dialogRef.close();
          }
        }
      );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
