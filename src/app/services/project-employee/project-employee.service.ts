import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProjectEmployeeMap } from '../../models/ProjectEmployeeMap';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectEmployeeService {

  PROJECT_EMPLOYEE_DATA:ProjectEmployeeMap[];
  constructor(private http: HttpClient) {}
  
  initMapping():Observable<HttpResponse<ProjectEmployeeMap[]>>{ 
    return this.http.get<ProjectEmployeeMap[]>(environment.apiEndPoint+'api/enterceptorapi/ProjectEmployeeMap?UserId=1', { observe: 'response' });
  }

  
  getMapping(id:number):ProjectEmployeeMap{
    let record:ProjectEmployeeMap=null;
    for(let i=0;i<this.PROJECT_EMPLOYEE_DATA.length;i++){
      if(this.PROJECT_EMPLOYEE_DATA[i].Id==id){
        record=this.PROJECT_EMPLOYEE_DATA[i];
        return record;
      }
    }
    return record;
  }

  addMapping(record:ProjectEmployeeMap){
    
    return this.http.post(environment.apiEndPoint+'api/enterceptorapi/ProjectEmployeeMap',{...record});
}

updateMapping(record:ProjectEmployeeMap){
  console.log('Update',record)
  let isActive=0;
  if(record['IsActive']){
    isActive=1;
  }
 
  return this.http.put(environment.apiEndPoint+'api/enterceptorapi/ProjectEmployeeMap',{...record,IsActive:isActive});
}

deleteMapping(record:ProjectEmployeeMap){
  console.log('Delete',record)
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {Id:record['Id']}
};
  this.http.delete(environment.apiEndPoint+'api/enterceptorapi/ProjectEmployeeMap',httpOptions).subscribe((resp)=>{
    console.log(resp)
  });
  let index=this.PROJECT_EMPLOYEE_DATA.indexOf(record);
  console.log(index);
  this.PROJECT_EMPLOYEE_DATA.splice(index,1);
}


}
