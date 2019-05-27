import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'app/services/login-service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidCreds=false;
  constructor(private fb: FormBuilder,private loginService :LoginService,private router: Router) { }
  user = this.fb.group({
    userName:["",[Validators.required]],
    userPassword:["",[Validators.required]]
  });

  ngOnInit() {
    // if(localStorage.getItem("userAuthToken")){
    //   this.router.navigate(['/dashboard']);

    // }
  }
  onSubmit()
  {
    this.loginService.login(this.user.value).subscribe((response)=>{
     localStorage.setItem("userAuthToken",response['token']);
     this.invalidCreds=false;
     this.router.navigate(['/dashboard']);
      },(error)=>{
        this.invalidCreds=true;
    });
      // console.log("Usename ",this.user.get('userName').value)
      // console.log("Usename ",this.user.get('userPassword').value)
      // if(this.loginService.login()){
      //   this.router.navigate(['/dashboard']);
      // }
  }

}
