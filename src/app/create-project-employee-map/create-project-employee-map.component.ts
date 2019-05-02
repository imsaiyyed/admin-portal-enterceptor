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
import { ValidateStartDate, ValidateEndDate, validateDate } from "../validators/custom-validator";
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
      let startDate=new Date(this.record.StartDate);
      let endDate=new Date(this.record.EndDate);

      this.projectEmployeeDetails.get('StartDate').setValue(startDate.toISOString().slice(0,10));
      this.projectEmployeeDetails.get('EndDate').setValue(endDate.toISOString().slice(0,10));
      this.projectEmployeeDetails.get('EndDate').setValidators([Validators.required,ValidateEndDate]);

    } else {
      let employeeId = this.data["EmployeeId"];
      this.projectEmployeeDetails = this.fb.group({
        Id: [0],
        UserId: [1],
        StartDate: ["", Validators.required],
        EndDate: ["", [Validators.required,ValidateEndDate]],
        ProjectId: ["", [Validators.required]],
        EmployeeId: [employeeId, [Validators.required]],
        ManagerId: ["", [Validators.required]],
        IsActive: [true]
      });
    }
    this.onChanges();

  }
  onChanges(): void {
  

    this.projectEmployeeDetails.get("StartDate").valueChanges.subscribe(val => {
      console.log(val);
      if(this.projectEmployeeDetails.get("EndDate").value!=''){
      if(!validateDate(val,this.projectEmployeeDetails.get("EndDate").value)){
        this.projectEmployeeDetails.get('EndDate').setErrors({invalidEndDate:true});
      }else{
        this.projectEmployeeDetails.get('EndDate').setErrors(null);
      }
      }
    });
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
  getErrorMessageEndDate(){
    console.log(this.projectEmployeeDetails.get('EndDate'));
    return this.projectEmployeeDetails.get('EndDate').hasError('required') ? 'You must enter a value' :
    this.projectEmployeeDetails.get('EndDate').hasError('invalidEndDate') ? 'End date must be greater htan start date' :
        '';
  }
  getErrorMessage(formControlName){
    return this.projectEmployeeDetails.get(formControlName).hasError('required') ? 'You must enter a value' :
    this.projectEmployeeDetails.get(formControlName).hasError('email') ? 'Please enter valid email id' :
        '';
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
