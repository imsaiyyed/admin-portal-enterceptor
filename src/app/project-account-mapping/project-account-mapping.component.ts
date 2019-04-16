import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectAccountService } from '../services/project-account/project-account.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ProjectAccountMap } from '../models/ProjectAccountMap';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-project-account-mapping',
  templateUrl: './project-account-mapping.component.html',
  styleUrls: ['./project-account-mapping.component.css']
})
export class ProjectAccountMappingComponent implements OnInit {
  displayedColumns: string[] ;
  dataSource ;
  selection = new SelectionModel<ProjectAccountMap>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private projectAccountService:ProjectAccountService) { }

  ngOnInit() {
    this.projectAccountService.initClients().subscribe((resp)=>{
      this.projectAccountService.PROJECT_ACCOUNT_DATA=resp.body;
      this.dataSource = new MatTableDataSource<ProjectAccountMap>(this.projectAccountService.PROJECT_ACCOUNT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.displayedColumns= ['Id', 'ProjectTitle', 'AccountName', 'StartDate','EndDate','edit'];

  }

}
