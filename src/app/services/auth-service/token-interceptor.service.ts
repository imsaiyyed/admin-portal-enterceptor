import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
if(request.body){
    if(request.body.LoggingIn){
      console.log(request)
      return next.handle(request);

    }else{

    request = request.clone({
      setHeaders: {
        'x-access-token': localStorage.getItem("userAuthToken")
      }
    });
    return next.handle(request);
  }
}
request = request.clone({
  setHeaders: {
    'x-access-token': localStorage.getItem("userAuthToken")
  }
});
return next.handle(request);
  }

  constructor() { }
}

