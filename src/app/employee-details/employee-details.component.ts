import { Component, OnInit, ViewChild } from '@angular/core';
import {EmployeeDetails} from '../models/EmployeeDetails';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { EmployeeDetailsService } from '../services/employee-service/employee-details.service';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  displayedColumns: string[] ;
  dataSource ;
  selection = new SelectionModel<EmployeeDetails>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private employeeDetailsService:EmployeeDetailsService,private snackBar: MatSnackBar){

  }
  ngOnInit() {
    this.employeeDetailsService.initClients().subscribe((resp)=>{
      // PROJECT_DATA=resp.body;
      console.log('init',resp.body);
      this.employeeDetailsService.EMPLOYEE_DATA=resp.body;
      this.dataSource = new MatTableDataSource<EmployeeDetails>(this.employeeDetailsService.EMPLOYEE_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.displayedColumns= ['Id','Email', 'Designation','EmployeeName','IsActive','edit','delete'];
    
  }
  deleteEmployee(employee:EmployeeDetails){

    this.employeeDetailsService.deleteEmployee(employee);
    this.dataSource=new MatTableDataSource<EmployeeDetails>(this.employeeDetailsService.EMPLOYEE_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.snackBar.open('Employee deleted...', 'Ok', {
      duration: 3000
    });
  }




  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: EmployeeDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }
 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editRecord(record){
    console.log(record);
  }
  // deleteClient(client:EmployeeDetails){

  //   this.employeeDetailsService.deleteClient(client);
  //   this.dataSource=new MatTableDataSource<EmployeeDetails>(this.employeeDetailsService.EMPLOYEE_DATA);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //   this.snackBar.open('Employee deleted...', 'Ok', {
  //     duration: 3000
  //   });
  // }
}