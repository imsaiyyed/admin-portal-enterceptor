import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient){ }
  public login():boolean
  {
    this.http.get('https://einterceptorapi.azurewebsites.net/api/enterceptorapi/users').subscribe((response)=>{
      console.log("RESPONSE ",response);
    });
    return true;
  }

  
}

