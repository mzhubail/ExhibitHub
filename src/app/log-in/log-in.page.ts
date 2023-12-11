import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  constructor(public authSrv:AuthenticationService, public formBuilder:FormBuilder, public router:Router) { }

  ngOnInit() {

    this.validate_login();

  }

  loginForm:FormGroup;

 validate_login(){
  this.loginForm = this.formBuilder.group({
    email: ['' ,Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([
        Validators.required,
      ]),
    ],
  });
 }

 

 checkCredentials(){
   let email:string = this.loginForm.get('email').value;
   let password:string = this.loginForm.get('password').value;
  if(this.loginForm.valid&&password.length>7&&password.length<21){
    this.authSrv.signIn(email,password);
  }
  else{
    this.authSrv.generalAlert(
      'Wrong Credentials',
      'Incorrect Email or Password ❌',
      ['OK']
    );
  }
 }


}
