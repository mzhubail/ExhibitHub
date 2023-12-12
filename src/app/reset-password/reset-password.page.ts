import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  constructor(
    public authSrv: AuthenticationService,
    public formBuilder: FormBuilder
  ) {

    this.validateEmail();
  }

  ngOnInit() {}

  emailForm: FormGroup;

  validateEmail() {
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\.)+[\\w-]{2,4}$')])],
    });
  }


  choice:string;
  request(choice:string){
    this.choice = choice;
  }

check(){

  if(!this.emailForm.valid){
    this.authSrv.generalAlert('Invalid Email','Please, make sure you enter a valid email', ['OK']);
    return;
  }
  let email = this.emailForm.get('email').value;
  if(this.choice==='reset'){
    this.resetPasswordEmail(email);
  }
  else{
    this.loginInEmail(email);
  }

}

resetPasswordEmail(email:string){
  // is it working?
  this.authSrv.resetPasswordEmail(email);
}

  loginInEmail(email:string) {
       this.authSrv.signInEmail(email);
  }


}
