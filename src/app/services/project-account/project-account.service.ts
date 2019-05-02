import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProjectAccountMap } from "../../models/ProjectAccountMap";
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class ProjectAccountService {

  PROJECT_ACCOUNT_DATA:ProjectAccountMap[];
  constructor(private http: HttpClient) {}
  
  initMaaping():Observable<HttpResponse<ProjectAccountMap[]>>{ 
    return this.http.get<ProjectAccountMap[]>(environment.apiEndPoint+'api/enterceptorapi/ProjectAccountMap?UserId=1', { observe: 'response' });
  }

  
  getMapping(id:number):ProjectAccountMap{
    let record:ProjectAccountMap=null;
    for(let i=0;i<this.PROJECT_ACCOUNT_DATA.length;i++){
      if(this.PROJECT_ACCOUNT_DATA[i].Id==id){
        record=this.PROJECT_ACCOUNT_DATA[i];
        return record;
      }
    }
    return record;
  }

  addMapping(record:ProjectAccountMap){
    let renewable=0;
    if(record['Renewable']){
      renewable=1;
    }
    return this.http.post(environment.apiEndPoint+'api/enterceptorapi/ProjectAccountMap',{...record,Renewable:renewable});
}

updateMapping(record:ProjectAccountMap){
  console.log('Update',record)
  let isActive=0;
  if(record['IsActive']){
    isActive=1;
  }
  let renewable=0;
  if(record['Renewable']){
    renewable=1;
  }
  return this.http.put(environment.apiEndPoint+'api/enterceptorapi/ProjectAccountMap',{...record,Renewable:renewable,IsActive:isActive});
}

deleteMapping(record:ProjectAccountMap){
  console.log('Delete',record)
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {Id:record['Id']}
};
  this.http.delete(environment.apiEndPoint+'api/enterceptorapi/ProjectAccountMap',httpOptions).subscribe((resp)=>{
    console.log(resp)
  });
  let index=this.PROJECT_ACCOUNT_DATA.indexOf(record);
  console.log(index);
  this.PROJECT_ACCOUNT_DATA.splice(index,1);
}


}
