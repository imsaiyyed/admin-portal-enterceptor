import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource,MatSort} from '@angular/material';
import {ProjectDetails} from '../models/ProjectDetails';
import {SelectionModel} from '@angular/cdk/collections';
import {ProjectDetailsService} from '../services/project-service/project-details.service';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  displayedColumns: string[] ;
  dataSource ;
  selection = new SelectionModel<ProjectDetails>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private projectDetails:ProjectDetailsService){

  }
  ngOnInit() {
    this.displayedColumns= ['projectId', 'projectTitle', 'startDate', 'endDate','isActive','edit'];
    const PROJECT_DATA=this.projectDetails.PROJECT_DATA;
    this.dataSource = new MatTableDataSource<ProjectDetails>(PROJECT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
   checkboxLabel(row?: ProjectDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.projectId + 1}`;
  }
 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editRecord(record){
    console.log(record);
  }
}



