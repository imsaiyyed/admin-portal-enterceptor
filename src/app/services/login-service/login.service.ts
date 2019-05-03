import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient){ }
  public login(user)
  {
    return this.http.post(environment.apiEndPoint+'api/auth/login',{Username:user.userName,Password:user.userPassword,LoggingIn:true})
  }

  
}

