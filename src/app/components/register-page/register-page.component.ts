import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    checkPassword: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required)
  });

  constructor(private login:LoginService) { }

  ngOnInit(): void {
  }

  onClickRegister(){
    const user = {username: this.profileForm.value.username, password:this.profileForm.value.password, email:this.profileForm.value.email, dob:this.profileForm.value.dob}
    this.login.searchBeforeRegister(user);
    this.login.newRegisterCheck$.subscribe((users) => {
      console.log(users.length);
      
      if (users.length < 1) {
        this.value = "";
        this.login.registerNewProfile(user).subscribe(user => console.log(user))
      } else {
        this.value = users.length + "";
        console.log("false", this.value);
      }})
    
  }
}
