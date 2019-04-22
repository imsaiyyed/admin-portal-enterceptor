import { Component, OnInit, ViewChild } from "@angular/core";
import { EmployeeDetails } from "../models/EmployeeDetails";
import { FormBuilder, Validators } from "@angular/forms";
import { EmployeeDetailsService } from "../services/employee-service/employee-details.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MatSnackBar,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { ProjectEmployeeMap } from "../models/ProjectEmployeeMap";
import { SelectionModel } from "@angular/cdk/collections";
import { ProjectEmployeeService } from "../services/project-employee/project-employee.service";
import { CreateProjectEmployeeMapComponent } from "../create-project-employee-map/create-project-employee-map.component";

@Component({
  selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",
  styleUrls: ["./employee-profile.component.css"]
})
export class EmployeeProfileComponent implements OnInit {
  employee: EmployeeDetails;
  employeeDetails;
  isEdit = false;
  emplyees: EmployeeDetails[];
  filteredData = new Array<ProjectEmployeeMap>();
  displayedColumns: string[];
  dataSource = new MatTableDataSource<ProjectEmployeeMap>();
  selection = new SelectionModel<ProjectEmployeeMap>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private fb: FormBuilder,
    private employeeDetailsService: EmployeeDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private projectEmployeeService: ProjectEmployeeService
  ) {}

  ngOnInit() {
    let employeeId = parseInt(this.route.snapshot.paramMap.get("employeeId"));
    this.employeeDetailsService.initClients().subscribe(resp => {
      this.employeeDetailsService.EMPLOYEE_DATA = resp.body;
      this.emplyees = resp.body;
    });
    if (employeeId == 0) {
      this.employeeDetails = this.fb.group({
        FirstName: ["", [Validators.required]],
        LastName: ["", [Validators.required]],
        UserId: [1],
        Email: ["", Validators.required],
        AllowMonitoring: [true, [Validators.required]],
        Designation: ["", [Validators.required]],
        IsActive: [true]
      });
    } else {
      this.isEdit = true;
      this.employee = this.employeeDetailsService.getClient(employeeId);
      this.employeeDetails = this.fb.group({
        Id: [this.employee.Id],
        FirstName: [this.employee.FirstName, [Validators.required]],
        LastName: [this.employee.LastName, [Validators.required]],
        UserId: [1],
        Email: [this.employee.Email, Validators.required],
        AllowMonitoring: [this.employee.AllowMonitoring, [Validators.required]],
        Designation: [this.employee.Designation, [Validators.required]],
        IsActive: [this.employee.IsActive]
      });

      this.projectEmployeeService.initMapping().subscribe(resp => {
        this.projectEmployeeService.PROJECT_EMPLOYEE_DATA = resp.body;
        let tempdata = this.projectEmployeeService.PROJECT_EMPLOYEE_DATA;

        tempdata.forEach(data => {
          if (data.EmployeeId == employeeId) {
            this.filteredData.push(data);
          }
        });
        this.dataSource = new MatTableDataSource<ProjectEmployeeMap>(
          this.filteredData
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.displayedColumns = [
        // "Id",
        // "ProjectTitle",
        "ProjectTitle",
        "ManagerName",
        "StartDate",
        "EndDate",
        "edit"
      ];
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  linkProject() {
    let dialogRef = this.dialog.open(CreateProjectEmployeeMapComponent, {
      width: "600px",
      data: { EmployeeId: this.employee.Id, isEdit: "false" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");

      this.projectEmployeeService.initMapping().subscribe(resp => {
        this.projectEmployeeService.PROJECT_EMPLOYEE_DATA = resp.body;
        let tempdata = this.projectEmployeeService.PROJECT_EMPLOYEE_DATA;
        this.filteredData = new Array<ProjectEmployeeMap>();

        tempdata.forEach(data => {
          if (data.EmployeeId == this.employee.Id) {
            this.filteredData.push(data);
          }
        });
        this.dataSource = new MatTableDataSource<ProjectEmployeeMap>(
          this.filteredData
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }
  editMapping(record: ProjectEmployeeMap) {
    let dialogRef = this.dialog.open(CreateProjectEmployeeMapComponent, {
      width: "600px",
      data: { Record:record , isEdit: "true" }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");

      this.projectEmployeeService.initMapping().subscribe(resp => {
        this.projectEmployeeService.PROJECT_EMPLOYEE_DATA = resp.body;
        let tempdata = this.projectEmployeeService.PROJECT_EMPLOYEE_DATA;
        this.filteredData = new Array<ProjectEmployeeMap>();

        tempdata.forEach(data => {
          if (data.EmployeeId == this.employee.Id) {
            this.filteredData.push(data);
          }
        });
        this.dataSource = new MatTableDataSource<ProjectEmployeeMap>(
          this.filteredData
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  onSubmit() {
    console.log(this.employeeDetails.value);
    let employeeId = parseInt(this.route.snapshot.paramMap.get("employeeId"));
    if (employeeId == 0) {
      this.employeeDetailsService
        .addEmployee(this.employeeDetails.value)
        .subscribe(
          resp => {
            console.log(resp);
          },
          error => {
            console.log("Erro", error);
            if (error.statusText == "Created") {
              this.snackBar.open("Employee added successfully...", "Ok", {
                duration: 3000
              });
              this.router.navigate(["/employee-details"]);
            }
          }
        );
    } else {
      this.employeeDetailsService
        .updateClient(this.employeeDetails.value)
        .subscribe(
          resp => {
            console.log(resp);
          },
          error => {
            console.log("Erro", error);
            if (error.statusText == "Created") {
              this.snackBar.open("Employee updated successfully...", "Ok", {
                duration: 3000
              });
              this.router.navigate(["/employee-details"]);
            }
          }
        );
    }
  }
}
