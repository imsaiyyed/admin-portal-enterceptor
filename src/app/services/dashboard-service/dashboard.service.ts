
import { Injectable } from '@angular/core';
import {ClientDetails} from '../../models/ClientDetails';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  public POSITIVE_DATA:SentimentsChartModel[];
  public NEGATIVE_DATA:SentimentsChartModel[];
  public TRENDS_DATA:TrendsModel[];
  
  constructor(private http: HttpClient) { }
  
  initPositiveData():Observable<HttpResponse<SentimentsChartModel[]>>{
    return this.http.get<SentimentsChartModel[]>(environment.apiEndPoint+'api/enterceptorapi/Sentiments?Sentiment=Positive', { observe: 'response' });
  }
  initNegativeData():Observable<HttpResponse<SentimentsChartModel[]>>{
    return this.http.get<SentimentsChartModel[]>(environment.apiEndPoint+'api/enterceptorapi/Sentiments?Sentiment=Negative', { observe: 'response' });
  }
  initTrendsData():Observable<HttpResponse<TrendsModel[]>>{
    return this.http.get<TrendsModel[]>(environment.apiEndPoint+'api/enterceptorapi/SentimentTrend', { observe: 'response' });
  }
  // http://localhost:5000/api/enterceptorapi/SentimentTrend
//   getClient(clientId:number):ClientDetails{
//     let client:ClientDetails=null;
//     for(let i=0;i<this.CLIENT_DATA.length;i++){
//       if(this.CLIENT_DATA[i].Id==clientId){
//         client=this.CLIENT_DATA[i];
//         return client;
//       }
//     }
//     return client;
//   }

//   addClient(client:ClientDetails){
//     let allowMonitoring=0;
//     if(client['AllowMonitoring']){
//       allowMonitoring=1;
//     }
//     return this.http.post(environment.apiEndPoint+'api/enterceptorapi/clients',{...client,AllowMonitoring:allowMonitoring});
// }

// updateClient(client:ClientDetails){
//   console.log('Update',client)
//   let isActive=0;
//   if(client['IsActive']){
//     isActive=1;
//   }
//   let allowMonitoring=0;
//   if(client['AllowMonitoring']){
//     allowMonitoring=1;
//   }
//   return this.http.put(environment.apiEndPoint+'api/enterceptorapi/clients',{...client,AllowMonitoring:allowMonitoring,IsActive:isActive});
// }

// deleteClient(client:ClientDetails){
//   console.log('Delete',client)
//   const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {Id:client['Id']}
// };
//   this.http.delete(environment.apiEndPoint+'api/enterceptorapi/clients',httpOptions).subscribe((resp)=>{
//     console.log(resp)
//   });
//   let index=this.CLIENT_DATA.indexOf(client);
//   console.log(index);
//   this.CLIENT_DATA.splice(index,1);
// }


}

export class SentimentsChartModel{
  Accountname:String;
  Sentiment:String;
  Value:number;
}

export class TrendsModel{
  // Week:number;
  Month:number;
  AverageSentiment:number;
}