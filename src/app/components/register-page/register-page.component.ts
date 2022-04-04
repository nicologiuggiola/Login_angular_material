import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/custom-validators';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  value:string = ""

  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    checkPassword: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required)
  }, CustomValidators.mustMatch("password", "checkPassword"));

  constructor(private login:LoginService, private route: Router) { }

  ngOnInit(): void {
  }

  onClickRegister(){
    const user = {username: this.profileForm.value.username, password:this.profileForm.value.password, mail:this.profileForm.value.email, dob:this.profileForm.value.dob}
    this.login.searchBeforeRegister(user);
    this.login.newRegisterCheck$.subscribe((users) => {
      console.log(users.length);
      
      if (users.length < 1) {
        this.value = "";
        this.login.registerNewProfile(user).subscribe(user => console.log(user))
        this.route.navigate(['login'])
      } else {
        this.value = users.length + "";
        console.log("false", this.value);
      }})
    
  }
}
