import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProjectClientMap } from '../../models/ProjectClientMap';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectClientService {

  PROJECT_CLIENT_DATA:ProjectClientMap[];
  constructor(private http: HttpClient) {}
  
  initMapping():Observable<HttpResponse<ProjectClientMap[]>>{ 
    return this.http.get<ProjectClientMap[]>(environment.apiEndPoint+'api/enterceptorapi/ProjectClientMap?UserId=1', { observe: 'response' });
  }

  
  getMapping(id:number):ProjectClientMap{
    let record:ProjectClientMap=null;
    for(let i=0;i<this.PROJECT_CLIENT_DATA.length;i++){
      if(this.PROJECT_CLIENT_DATA[i].Id==id){
        record=this.PROJECT_CLIENT_DATA[i];
        return record;
      }
    }
    return record;
  }

  addMapping(record:ProjectClientMap){
    
    return this.http.post(environment.apiEndPoint+'api/enterceptorapi/ProjectClientMap',{...record});
}

updateMapping(record:ProjectClientMap){
  console.log('Update',record)
  let isActive=0;
  if(record['IsActive']){
    isActive=1;
  }
  let renewable=0;
  if(record['Renewable']){
    renewable=1;
  }
  return this.http.put(environment.apiEndPoint+'api/enterceptorapi/ProjectClientMap',{...record,Renewable:renewable,IsActive:isActive});
}

deleteMapping(record:ProjectClientMap){
  console.log('Delete',record)
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {Id:record['Id']}
};
  this.http.delete(environment.apiEndPoint+'api/enterceptorapi/ProjectClientMap',httpOptions).subscribe((resp)=>{
    console.log(resp)
  });
  let index=this.PROJECT_CLIENT_DATA.indexOf(record);
  console.log(index);
  this.PROJECT_CLIENT_DATA.splice(index,1);
}


}