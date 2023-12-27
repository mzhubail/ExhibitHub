import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  emailForm: FormGroup;

  constructor(
    public authSrv: AuthenticationService,
    public formBuilder: FormBuilder
  ) {
    this.emailForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+.)+[\\w-]{2,4}$'),
        ]),
      ],
    });
  }

  ngOnInit() {}

  // TODO: fix this!!
  choice!: string;
  request(choice: string) {
    this.choice = choice;
  }

  check() {
    if (!this.emailForm.valid) {
      this.authSrv.generalAlert(
        'Invalid Email',
        'Please, make sure you enter a valid email',
        ['OK']
      );
      return;
    }
    let email = this.emailForm.controls['email'].value;
    if (this.choice === 'reset') {
      this.resetPasswordEmail(email);
    }
  }

  resetPasswordEmail(email: string) {
    // Check if the email is within auth accounts
    this.authSrv.checkDuplicate(email).then((ans) => {
      if (!ans) {
        this.authSrv.resetPasswordEmail(email);
      } else {
        this.authSrv.generalAlert('Invalid Email', 'Email does not exist !', [
          'OK',
        ]);
      }
    });
  }
}
