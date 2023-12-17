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

  loginForm;
  constructor(public authSrv:AuthenticationService, public formBuilder:FormBuilder, public router:Router) { 
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\.)+[\\w-]{2,4}$')])],
      password: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });

    const auth = getAuth();
    const email = window.localStorage.getItem('emailForSignIn');
    const url = window.location.href;
    if (email && url.includes('mode=signIn')) {
       this.authSrv.getRoleByEmail(email).then((role)=>{

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

  ngOnInit() { }
 

 checkCredentials(){
   let email = this.loginForm.controls.email.value;
   let password = this.loginForm.controls.password.value;
  if(this.loginForm.valid && email !== null && password !== null
    &&password.length>7&&password.length<21){
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
