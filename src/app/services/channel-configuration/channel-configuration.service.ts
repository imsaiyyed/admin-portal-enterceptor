import { Injectable } from '@angular/core';
import {AccountDetails} from '../../models/AccountDetails';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelConfigurationService {
public CHANNEL_DATA:Channel[];
public CHANNEL_CONFIGURATION_DATA:ChannelConfiguration[];
public CHANNEL_CREDENTIAL_DATA:ChannelCredential[];

  constructor(private http: HttpClient) { }


  initChannels():Observable<HttpResponse<Channel[]>>{
   return this.http.get<Channel[]>(environment.apiEndPoint+'api/enterceptorapi/Channels', { observe: 'response' })
  //  .subscribe((resp)=>{
  //    this.CHANNEL_DATA=resp;
  //    this.CHANNEL_DATA.forEach((channel,index)=>{
  //     this.http.get<ChannelConfiguration[]>(environment.apiEndPoint+'api/enterceptorapi/ChannelConfiguration?ChannelId='+channel.Id).subscribe((resp)=>{
  //     this.CHANNEL_CONFIGURATION_DATA[index]=new Array<ChannelConfiguration[]>();
  //     this.CHANNEL_CONFIGURATION_DATA[index].push(resp);
  //       console.log(this.CHANNEL_CONFIGURATION_DATA);
  //     });
  //    });
  //    console.log(this.CHANNEL_DATA);
  //  });
   
  }
  initChannelConfigurations():Observable<HttpResponse<ChannelConfiguration[]>>{
     return this.http.get<ChannelConfiguration[]>(environment.apiEndPoint+'api/enterceptorapi/ChannelConfigurationList', { observe: 'response' });
  }
  initChannelCredentials():Observable<HttpResponse<ChannelCredential[]>>{
    return this.http.get<ChannelCredential[]>(environment.apiEndPoint+'api/enterceptorapi/ChannelCredentialList?UserId=1', { observe: 'response' });
  }
  addNewKey(channelId:number,newKey:String){
    return this.http.post(environment.apiEndPoint+'api/enterceptorapi/ChannelConfiguration',{ChannelId:channelId,Key:newKey});
  }
  saveKeyValue(creds:ChannelCredential,newKeyValue:String){
    return this.http.put(environment.apiEndPoint+'api/enterceptorapi/ChannelCredentials',{Id:creds.Id,ChannelId:creds.ChannelId,UserId:creds.UserId,KeyId:creds.KeyId,Value:newKeyValue}).subscribe((resp)=>{
      console.log(resp);
    });
  }
  deleteKey(key:ChannelConfiguration){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {Id:key.Id}
  };
    return this.http.delete(environment.apiEndPoint+'api/enterceptorapi/ChannelConfiguration?Id='+key.Id,httpOptions);
    // .subscribe((resp)=>{
    //   console.log(resp)
    // });
    // let index=this.CHANNEL_CONFIGURATION_DATA.indexOf(key);
    // this.CHANNEL_CONFIGURATION_DATA.splice(index,1);
  }
  // getAccount(accountId: number): AccountDetails {
  //   let account:AccountDetails=null;
  //   for(let i=0;i<this.ACCOUNT_DATA.length;i++){
  //     if(this.ACCOUNT_DATA[i].AccountId==accountId){
  //       account=this.ACCOUNT_DATA[i];
  //       return account;
  //     }
  //   }
  //   return account;
  // }
  
  // addAccount(account:AccountDetails){
  //     return this.http.post(environment.apiEndPoint+'api/enterceptorapi/account',{AccountName:account['AccountName'],UserId:account['UserId']});
  // }

  // updateAccount(account:AccountDetails){
  //   console.log('Update',account)
  //   let isActive=0;
  //   if(account['IsActive']){
  //     isActive=1;
  //   }
  //   return this.http.put(environment.apiEndPoint+'api/enterceptorapi/account',{AccountName:account['AccountName'],AccountId:account['AccountId'],IsActive:isActive});
  // }

  // deleteAccount(account:AccountDetails){
  //   console.log(account)
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {AccountId:account['AccountId']}
  // };
  //   this.http.delete(environment.apiEndPoint+'api/enterceptorapi/account',httpOptions).subscribe((resp)=>{
  //     console.log(resp)
  //   });
  //   let index=this.ACCOUNT_DATA.indexOf(account);
  //   this.ACCOUNT_DATA.splice(index,1);
  // }

  // getAccountId():number{
  //   return this.accountId;
  // }
  // setAccountId(id:number){
  //   this.accountId=id;
  // }
}

export class Channel{
  Id:number;
  ChannelName:String;
  IsActive:boolean;
}
export class ChannelConfiguration{
  Id:number;
  ChannelId:number;
  Key:String;
}
export class ChannelCredential{
  Id:number;
  UserId:number;
  ChannelId:number;
  Channel_Name:String;
  KeyId:number;
  Key:String;
  Value:String;
}