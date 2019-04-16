import { Injectable } from '@angular/core';
import { ProjectDetails } from '../../models/ProjectDetails';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

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
  
  addProject(project:ProjectDetails){
    // console.log(project.StartDate.toLocaleDateString())
    return this.http.post('https://einterceptorapi.azurewebsites.net/api/enterceptorapi/projects',{...project});
  }
  
updateProject(project:ProjectDetails){
  console.log(project);
  let isActive=0;
  if(project['IsActive']){
    isActive=1;
  }
  return this.http.put('https://einterceptorapi.azurewebsites.net/api/enterceptorapi/projects',{...project,IsActive:isActive});
}
deleteProject(project:ProjectDetails){
  console.log('Delete',project)
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {ProjectId:project['ProjectId']}
};
  this.http.delete('https://einterceptorapi.azurewebsites.net/api/enterceptorapi/projects',httpOptions).subscribe((resp)=>{
    console.log(resp)
  });
  let index=this.PROJECT_DATA.indexOf(project);
  console.log(index);
  this.PROJECT_DATA.splice(index,1);
}

}
