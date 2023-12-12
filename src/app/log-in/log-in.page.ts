import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged, signInWithEmailLink } from '@angular/fire/auth';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  role:string;
  constructor(public authSrv:AuthenticationService, public formBuilder:FormBuilder, public router:Router) { 
    const auth = getAuth();
    const email = window.localStorage.getItem('emailForSignIn');
    const url = window.location.href;
    if (email && url.includes('mode=signIn')) {
       this.authSrv.getRoleByEmail(email).then((role)=>{

        this.role = role;

        signInWithEmailLink(auth, email, url).then(() => {
          // The user has been signed in.
          this.router.navigateByUrl('/'+role);
        }).catch(() => {
          this.authSrv.generalAlert(
            'Fail',
            'Sorry, something wrong logging you in. Try again later ❌',
            [
              'OK'
            ]
          );
        });
      
      });
     
    }
  }

  ngOnInit() {

    this.validate_login();

  }

  loginForm:FormGroup;

 validate_login(){
  this.loginForm = this.formBuilder.group({
    email: ['' ,Validators.compose([Validators.required, Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\.)+[\\w-]{2,4}$')])],
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
