import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeDetailsService } from '../services/employee-service/employee-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { EmployeeDetails } from '../models/EmployeeDetails';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeDetails;
  isEdit=false;
  emplyees:EmployeeDetails[];
  constructor( private fb: FormBuilder,
    private employeeDetailsService: EmployeeDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    let employeeId = parseInt(this.route.snapshot.paramMap.get("employeeId"));
    this.employeeDetailsService.initClients().subscribe((resp)=>{
      this.employeeDetailsService.EMPLOYEE_DATA=resp.body;
      this.emplyees=resp.body;
    });
    if (employeeId == 0) {
      this.employeeDetails = this.fb.group({
        FirstName: ["", [Validators.required]],
        LastName: ["", [Validators.required]],
        UserId: [1],
        Email: ["",Validators.required],
        AllowMonitoring:[true,[Validators.required]],
        Designation:["",[Validators.required]],
        IsActive:[true]
      });
    } else {
      this.isEdit=true;
      let employee=this.employeeDetailsService.getClient(employeeId);
      this.employeeDetails = this.fb.group({
        Id:[employee.Id],
        FirstName: [employee.FirstName, [Validators.required]],
        LastName: [employee.LastName, [Validators.required]],
        UserId: [1],
        Email: [employee.Email,Validators.required],
        AllowMonitoring:[employee.AllowMonitoring,[Validators.required]],
        Designation:[employee.Designation,[Validators.required]],
        IsActive:[employee.IsActive]
      });
    }

  }

  onSubmit(){
    console.log(this.employeeDetails.value);
    let employeeId = parseInt(this.route.snapshot.paramMap.get("employeeId"));
    if(employeeId==0){
      this.employeeDetailsService.addEmployee(this.employeeDetails.value).subscribe((resp)=>{
        console.log(resp);
      },(error)=>{
        console.log('Erro',error);
        if(error.statusText=='Created'){
          this.snackBar.open('Employee added successfully...', 'Ok', {
            duration: 3000
          });
          this.router.navigate(['/employee-details']);
        }
      });
    }
    else{
      this.employeeDetailsService.updateEmployee(this.employeeDetails.value).subscribe((resp)=>{
        console.log(resp);
      },(error)=>{
        console.log('Erro',error);
        if(error.statusText=='Created'){
          this.snackBar.open('Employee updated successfully...', 'Ok', {
            duration: 3000
          });
          this.router.navigate(['/employee-details']);
        }
      });  
    }
  }

}
