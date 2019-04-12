import { Injectable } from '@angular/core';
import { ProjectDetails } from '../../models/ProjectDetails';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {
  public PROJECT_DATA:ProjectDetails[];

  constructor(private http: HttpClient) { }
  initProjects():Observable<HttpResponse<ProjectDetails[]>>{
    let data:ProjectDetails[];
    return this.http.get<ProjectDetails[]>('https://einterceptorapi.azurewebsites.net/api/enterceptorapi/Projects?UserId=1', { observe: 'response' })
  }

  getProject(projectId: number): ProjectDetails {
    let project:ProjectDetails=null;
    for(let i=0;i<this.PROJECT_DATA.length;i++){
      if(this.PROJECT_DATA[i].ProjectId==projectId){
        project=this.PROJECT_DATA[i];
        return project;
      }
    }
    return project;
  }
  
  addProject(project:ProjectDetails):boolean{
    let oldLength=this.PROJECT_DATA.length;
    project.ProjectId=oldLength+1;
    let newLength=this.PROJECT_DATA.push(project);
    if(oldLength<newLength){
      return true;
    }
    return false;
  }

}
