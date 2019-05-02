import { Injectable } from '@angular/core';
import { EmployeeDetails } from '../../models/EmployeeDetails';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {
  public EMPLOYEE_DATA:EmployeeDetails[];

  constructor(private http: HttpClient) { }
  
  initClients():Observable<HttpResponse<EmployeeDetails[]>>{
    //https://einterceptorapi.azurewebsites.net/api/enterceptorapi/clients?UserId=1
    
    let data:EmployeeDetails[];
    return this.http.get<EmployeeDetails[]>(environment.apiEndPoint+'api/enterceptorapi/Employees?UserId=1', { observe: 'response' });
  }

  getClient(clientId:number):EmployeeDetails{
    let client:EmployeeDetails=null;
    for(let i=0;i<this.EMPLOYEE_DATA.length;i++){
      if(this.EMPLOYEE_DATA[i].Id==clientId){
        client=this.EMPLOYEE_DATA[i];
        return client;
      }
    }
    return client;
  }

  addEmployee(emplyee:EmployeeDetails){
    let allowMonitoring=0;
    if(emplyee['AllowMonitoring']){
      allowMonitoring=1;
    }
    return this.http.post(environment.apiEndPoint+'api/enterceptorapi/Employees',{...emplyee,AllowMonitoring:allowMonitoring});
}

updateEmployee(employee:EmployeeDetails){
  console.log('Update',employee)
  let isActive=0;
  if(employee['IsActive']){
    isActive=1;
  }
  let allowMonitoring=0;
  if(employee['AllowMonitoring']){
    allowMonitoring=1;
  }
  return this.http.put(environment.apiEndPoint+'api/enterceptorapi/Employees',{...employee,AllowMonitoring:allowMonitoring,IsActive:isActive});
}

deleteEmployee(employee:EmployeeDetails){
  console.log('Delete',employee)
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {Id:employee['Id']}
};
  this.http.delete(environment.apiEndPoint+'api/enterceptorapi/Employees',httpOptions).subscribe((resp)=>{
    console.log(resp)
  });
  let index=this.EMPLOYEE_DATA.indexOf(employee);
  console.log(index);
  this.EMPLOYEE_DATA.splice(index,1);
}


}
