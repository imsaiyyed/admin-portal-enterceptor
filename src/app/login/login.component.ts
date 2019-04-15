import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'app/services/login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private loginService :LoginService) { }
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
      this.loginService.login();
  }

}
