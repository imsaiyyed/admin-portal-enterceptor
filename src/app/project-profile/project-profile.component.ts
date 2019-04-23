import { Component, OnInit, ViewChild } from "@angular/core";
import { ProjectDetails } from "../models/ProjectDetails";
import { ActivatedRoute, Router } from "@angular/router";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

import {
  MatSnackBar,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatChipInputEvent
} from "@angular/material";
import { ProjectDetailsService } from "../services/project-service/project-details.service";
import { SelectionModel } from "@angular/cdk/collections";
import { ProjectAccountMap } from "../models/ProjectAccountMap";
import { ProjectAccountService } from "../services/project-account/project-account.service";
import { FormBuilder, Validators } from "@angular/forms";
import { CerateProjectAccountMapComponent } from "../cerate-project-account-map/cerate-project-account-map.component";
import { CreateClientComponent } from "../create-client/create-client.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CreateProjectClientMapComponent } from "../create-project-client-map/create-project-client-map.component";

@Component({
  selector: "app-project-profile",
  templateUrl: "./project-profile.component.html",
  styleUrls: ["./project-profile.component.css"]
})
export class ProjectProfileComponent implements OnInit {
  project: ProjectDetails;
  tags: Tag[] = [];
  projectDetails = this.fb.group({});
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  projectAccountDetails;
    
  filteredData = new Array<ProjectAccountMap>();
  displayedColumns: string[];
  dataSource = new MatTableDataSource<ProjectAccountMap>();
  selection = new SelectionModel<ProjectAccountMap>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private projectDetailsService: ProjectDetailsService,
    private projectAccountService: ProjectAccountService
  ) {}

  ngOnInit() {
    let projectId = parseInt(this.route.snapshot.paramMap.get("projectId"));
    this.project = this.projectDetailsService.getProject(projectId);

    // this.projectAccountDetails = this.fb.group({
    //   Id: [0],
    //   UserId: [1],
    //   StartDate: ["", Validators.required],
    //   EndDate: ["", [Validators.required]],
    //   Renewable: [true, [Validators.required]],
    //   RenewalDate: ["", [Validators.required]],
    //   ProjectId: [projectId, [Validators.required]],
    //   AccountId: [0, [Validators.required]],
    //   IsActive: [true]
    // });

    this.projectDetails = this.fb.group({
      ProjectTitle: [this.project.ProjectTitle, [Validators.required]],
      UserId: [this.project.UserId],
      ProjectId: [this.project.ProjectId],
      StartDate: [this.project.StartDate, [Validators.required]],
      EndDate: [this.project.EndDate, [Validators.required]],
      IsActive: [this.project.IsActive, [Validators.required]],
      Tags: [this.project.Tags, [Validators.required]]
    });
    let startDate = new Date(this.project.StartDate);
    let endDate = new Date(this.project.EndDate);

    this.projectDetails
      .get("StartDate")
      .setValue(startDate.toISOString().slice(0, 10));
    this.projectDetails
      .get("EndDate")
      .setValue(endDate.toISOString().slice(0, 10));

      let stringTags=this.project.Tags.split(',');
      for(let i=0;i<stringTags.length;i++){
        if(stringTags[i]!=''){
        this.tags.push({name:stringTags[i]})
        }
      }
    

    this.projectAccountService.initMaaping().subscribe(resp => {
      this.projectAccountService.PROJECT_ACCOUNT_DATA = resp.body;
      let tempdata = this.projectAccountService.PROJECT_ACCOUNT_DATA;

      tempdata.forEach(data => {
        if (data.ProjectId == projectId) {
          this.filteredData.push(data);
        }
      });
      this.dataSource = new MatTableDataSource<ProjectAccountMap>(
        this.filteredData
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.displayedColumns = [
      // "Id",
      // "ProjectTitle",
      "AccountName",
      "StartDate",
      "EndDate",
      "client",
      // "edit"
    ];
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  linkContact(accountId:number) {
    let dialogRef=this.dialog.open(CreateProjectClientMapComponent, {
      width: '600px',
      data: {ProjectId:this.project.ProjectId,AccountId:accountId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  linkAccount() {
    let dialogRef=this.dialog.open(CerateProjectAccountMapComponent, {
      width: '600px',
      data: {ProjectId:this.project.ProjectId,isEdit:'false'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.projectAccountService.initMaaping().subscribe(resp => {
        this.projectAccountService.PROJECT_ACCOUNT_DATA = resp.body;
        let tempdata = this.projectAccountService.PROJECT_ACCOUNT_DATA;
        this.filteredData=new Array<ProjectAccountMap>();
        tempdata.forEach(data => {
          if (data.ProjectId == this.project.ProjectId) {
            this.filteredData.push(data);
          }
        });
        this.dataSource = new MatTableDataSource<ProjectAccountMap>(
          this.filteredData
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
    // this.router.navigate([
    //   "/project-account/create-mapping",
    //   this.project.ProjectId,'false'
    // ]);
  }
  add(event: MatChipInputEvent): void {
    console.log(event);
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.tags.push({ name: value.trim() });
    }
    let newValue = "";
    for (let i = 0; i < this.tags.length; i++) {
      newValue = newValue.concat(this.tags[i].name + ",");
      console.log(newValue);
      console.log(this.tags[i].name);
    }
    this.projectDetails.get("Tags").setValue(newValue);

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }
  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onSubmit(){
    this.projectDetailsService.updateProject(this.projectDetails.value).subscribe((resp)=>{
      console.log(resp);
    },(error)=>{
      console.log(error);
      if(error.statusText=='Created'){
        this.snackBar.open('Project updated successfully...', 'Ok', {
          duration: 3000
        });
        this.router.navigate(['/project-details/project-profile/',this.project.ProjectId]);
      }
    });
  }
}
export interface Tag {
  name: string;
}
