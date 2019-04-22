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
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { ProjectEmployeeService } from "../services/project-employee/project-employee.service";
import { EmployeeDetails } from "../models/EmployeeDetails";
import { ProjectEmployeeMap } from "../models/ProjectEmployeeMap";
@Component({
  selector: "app-create-project-employee-map",
  templateUrl: "./create-project-employee-map.component.html",
  styleUrls: ["./create-project-employee-map.component.css"]
})
export class CreateProjectEmployeeMapComponent implements OnInit {
  projects: ProjectDetails[];
  employees: EmployeeDetails[];
  isEdit = false;
  projectEmployeeDetails = this.fb.group({});
  record: ProjectEmployeeMap;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private projectDetailsService: ProjectDetailsService,
    private accountDetailsService: AccountDetailsService,
    private clientDetailsService: ClientDetailsService,
    private projectClientService: ProjectClientService,
    private employeeDetailsService: EmployeeDetailsService,
    private projectEmployeeService: ProjectEmployeeService,
    public dialogRef: MatDialogRef<CreateProjectEmployeeMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    let paraEdit = this.data["isEdit"];

    this.projectDetailsService.initProjects().subscribe(resp => {
      this.projectDetailsService.PROJECT_DATA = resp.body;
      this.projects = resp.body;
    });

    this.employeeDetailsService.initClients().subscribe(resp => {
      this.employeeDetailsService.EMPLOYEE_DATA = resp.body;
      this.employees = resp.body;
    });

    if (paraEdit == "true") {
      this.isEdit = true;
      this.record = this.data["Record"];
      this.projectEmployeeDetails = this.fb.group({
        Id: [this.record.Id],
        UserId: [this.record.UserId],
        StartDate: [this.record.StartDate, Validators.required],
        EndDate: [this.record.EndDate, [Validators.required]],
        ProjectId: [this.record.ProjectId, [Validators.required]],
        EmployeeId: [this.record.EmployeeId, [Validators.required]],
        ManagerId: [this.record.ManagerId, [Validators.required]],
        IsActive: [this.record.IsActive]
      });
    } else {
      let employeeId = this.data["EmployeeId"];
      this.projectEmployeeDetails = this.fb.group({
        Id: [0],
        UserId: [1],
        StartDate: ["", Validators.required],
        EndDate: ["", [Validators.required]],
        ProjectId: [0, [Validators.required]],
        EmployeeId: [employeeId, [Validators.required]],
        ManagerId: [0, [Validators.required]],
        IsActive: [true]
      });
    }
  }
  onSubmit() {
    console.log(this.projectEmployeeDetails.value);
    if (this.isEdit) {
      this.projectEmployeeService
        .updateMapping(this.projectEmployeeDetails.value)
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
              this.router.navigate(["/employee-details/employee-profile/", this.record.EmployeeId]);
              this.dialogRef.close();
            }
          }
        );
    } else {
      let id = this.data["EmployeeId"];
      this.projectEmployeeService
        .addMapping(this.projectEmployeeDetails.value)
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
              this.router.navigate(["/employee-details/employee-profile/", id]);
              this.dialogRef.close();
            }
          }
        );
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
