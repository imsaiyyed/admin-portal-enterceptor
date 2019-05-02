import { Injectable } from '@angular/core';
import {ClientDetails} from '../../models/ClientDetails';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsService {
  public CLIENT_DATA:ClientDetails[];

  constructor(private http: HttpClient) { }
  
  initClients():Observable<HttpResponse<ClientDetails[]>>{
    
    let data:ClientDetails[];
    return this.http.get<ClientDetails[]>(environment.apiEndPoint+'api/enterceptorapi/clients?UserId=1', { observe: 'response' });
  }

  getClient(clientId:number):ClientDetails{
    let client:ClientDetails=null;
    for(let i=0;i<this.CLIENT_DATA.length;i++){
      if(this.CLIENT_DATA[i].Id==clientId){
        client=this.CLIENT_DATA[i];
        return client;
      }
    }
    return client;
  }

  addClient(client:ClientDetails){
    let allowMonitoring=0;
    if(client['AllowMonitoring']){
      allowMonitoring=1;
    }
    return this.http.post(environment.apiEndPoint+'api/enterceptorapi/clients',{...client,AllowMonitoring:allowMonitoring});
}

updateClient(client:ClientDetails){
  console.log('Update',client)
  let isActive=0;
  if(client['IsActive']){
    isActive=1;
  }
  let allowMonitoring=0;
  if(client['AllowMonitoring']){
    allowMonitoring=1;
  }
  return this.http.put(environment.apiEndPoint+'api/enterceptorapi/clients',{...client,AllowMonitoring:allowMonitoring,IsActive:isActive});
}

deleteClient(client:ClientDetails){
  console.log('Delete',client)
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {Id:client['Id']}
};
  this.http.delete(environment.apiEndPoint+'api/enterceptorapi/clients',httpOptions).subscribe((resp)=>{
    console.log(resp)
  });
  let index=this.CLIENT_DATA.indexOf(client);
  console.log(index);
  this.CLIENT_DATA.splice(index,1);
}


}
