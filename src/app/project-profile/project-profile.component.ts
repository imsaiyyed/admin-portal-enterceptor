import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectDetails } from '../models/ProjectDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProjectDetailsService } from '../services/project-service/project-details.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ProjectAccountMap } from '../models/ProjectAccountMap';
import { ProjectAccountService } from '../services/project-account/project-account.service';

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {

  project:ProjectDetails;
  tags:String[];

filteredData=new Array<ProjectAccountMap>(); 

displayedColumns: string[] ;
dataSource = new MatTableDataSource<ProjectAccountMap>();
selection = new SelectionModel<ProjectAccountMap>(true, []);
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar,
    private projectDetailsService: ProjectDetailsService,
    private projectAccountService:ProjectAccountService) { }

  ngOnInit() {
    let projectId = parseInt(this.route.snapshot.paramMap.get('projectId'));
    this.project=this.projectDetailsService.getProject(projectId);
    this.tags=this.project.Tags.split(',');
    this.tags=this.tags.slice(0,this.tags.length);
    console.log(this.project)

    this.projectAccountService.initClients().subscribe((resp)=>{
    this.projectAccountService.PROJECT_ACCOUNT_DATA=resp.body;
    let tempdata=this.projectAccountService.PROJECT_ACCOUNT_DATA;
    
    tempdata.forEach((data)=>{
      if(data.ProjectId==projectId){
        this.filteredData.push(data);
      }
    })
    this.dataSource = new MatTableDataSource<ProjectAccountMap>(this.filteredData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
  this.displayedColumns= ['Id', 'ProjectTitle', 'AccountName', 'StartDate','EndDate','edit'];
  }

  linkAccount(){
    this.router.navigate(['/project-account/create-mapping',this.project.ProjectId]);
  }

}



