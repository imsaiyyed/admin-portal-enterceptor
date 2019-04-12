import { Injectable } from '@angular/core';
import {AccountDetails} from '../../models/AccountDetails';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {

  public ACCOUNT_DATA:AccountDetails[];
  constructor(private http: HttpClient) { }

  initAccounts():Observable<HttpResponse<AccountDetails[]>>{
    let data:AccountDetails[];
    return this.http.get<AccountDetails[]>('https://einterceptorapi.azurewebsites.net/api/enterceptorapi/accounts?UserId=1', { observe: 'response' })
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
  
  addAccount(account:AccountDetails):boolean{
    console.log('Inside',account);
    let oldLength=this.ACCOUNT_DATA.length;
    account.AccountId=oldLength+1;
    let newLength=this.ACCOUNT_DATA.push(account);
    if(oldLength<newLength){
      this.http.post('https://einterceptorapi.azurewebsites.net/api/enterceptorapi/account',{AccountName:account['accountName'],UserId:account['userId'],IsActive:account['isActive']})
      .subscribe((resp)=>{
        console.log(resp);
      });
      return true;
    }
    return false;
  }
}
