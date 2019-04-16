import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'app/services/login-service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private loginService :LoginService,private router: Router) { }
  user = this.fb.group({
    userName:["",[Validators.required]],
    userPassword:["",[Validators.required]]
  });

  ngOnInit() {
  }
  onSubmit()
  {
      console.log("Usename ",this.user.get('userName').value)
      console.log("Usename ",this.user.get('userPassword').value)
      if(this.loginService.login()){
        this.router.navigate(['/dashboard']);
      }
  }

}
