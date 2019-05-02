import { Injectable } from '@angular/core';
import {AccountDetails} from '../../models/AccountDetails';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {
  
  public accountId:number=0;
  public ACCOUNT_DATA:AccountDetails[];
  constructor(private http: HttpClient) { }

  initAccounts():Observable<HttpResponse<AccountDetails[]>>{
    let data:AccountDetails[];
    return this.http.get<AccountDetails[]>(environment.apiEndPoint+'api/enterceptorapi/accounts?UserId=1', { observe: 'response' })
  }
  getAccount(accountId: number): AccountDetails {
    let account:AccountDetails=null;
    for(let i=0;i<this.ACCOUNT_DATA.length;i++){
      if(this.ACCOUNT_DATA[i].AccountId==accountId){
        account=this.ACCOUNT_DATA[i];
        return account;
      }
    }
    return account;
  }
  
  addAccount(account:AccountDetails){
      return this.http.post(environment.apiEndPoint+'api/enterceptorapi/account',{AccountName:account['AccountName'],UserId:account['UserId']});
  }

  updateAccount(account:AccountDetails){
    console.log('Update',account)
    let isActive=0;
    if(account['IsActive']){
      isActive=1;
    }
    return this.http.put(environment.apiEndPoint+'api/enterceptorapi/account',{AccountName:account['AccountName'],AccountId:account['AccountId'],IsActive:isActive});
  }

  deleteAccount(account:AccountDetails){
    console.log(account)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {AccountId:account['AccountId']}
  };
    this.http.delete(environment.apiEndPoint+'api/enterceptorapi/account',httpOptions).subscribe((resp)=>{
      console.log(resp)
    });
    let index=this.ACCOUNT_DATA.indexOf(account);
    this.ACCOUNT_DATA.splice(index,1);
  }

  getAccountId():number{
    return this.accountId;
  }
  setAccountId(id:number){
    this.accountId=id;
  }
}
