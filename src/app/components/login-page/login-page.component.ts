import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  value: string
  // pswvalue: string = ""

  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private login:LoginService, private route: Router) {
    this.value = ""
  }

  ngOnInit(): void {
    console.log(this.value);
  }

  onClickLogin(){
    this.login.searchForLogin(this.profileForm.value.username, this.profileForm.value.password)
    this.login.usernameCheck$.subscribe((users) => {
      if (users.length > 0) {
        this.value = "";
        this.route.navigate(['home']);
        this.login.isLogged = true;
        console.log("true",this.value);
      } else {
        this.value = users.length + "";
        console.log("false", this.value);
      }
    });
  }

}
