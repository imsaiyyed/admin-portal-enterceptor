import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { AccountDetailsService } from "../account-service/account-details.service";
import { ProjectDetailsService } from "../project-service/project-details.service";
import { ProjectAccountMap } from "../../models/ProjectAccountMap";

@Injectable({
  providedIn: "root"
})
export class ProjectAccountService {

  PROJECT_ACCOUNT_DATA:ProjectAccountMap[];
  constructor(private http: HttpClient) {}
  
  initClients():Observable<HttpResponse<ProjectAccountMap[]>>{ 
    return this.http.get<ProjectAccountMap[]>('https://einterceptorapi.azurewebsites.net/api/enterceptorapi/ProjectAccountMap?UserId=1', { observe: 'response' });
  }
}
