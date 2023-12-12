import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public authSrv: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.validation();

    
  }

  // I've edited "strict" to false in ts-config.json
  signup: FormGroup;

  validation() {
    this.signup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],

      first_name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[A-Za-z]{3,20}$'),
        ]),
      ],

      last_name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[A-Za-z]{3,20}$'),
        ]),
      ],

      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^(00|\\+)973(3|6)\\d{7}$'),
        ]),
      ],

      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])\\S+$'),
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],

      confirm_password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).+$'),
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
      role: [
        'client'
      ],
    });
  }

  register(formInformation: any) {
    // check if mismatch. then check the validation as a whole

    let email = formInformation.get('email').value;
    let phone = formInformation.get('phone').value;
    let first_name = formInformation.get('first_name').value;
    let last_name = formInformation.get('last_name').value;
    let pass = formInformation.get('password').value;
    let confirm_pass = formInformation.get('confirm_password').value;
    let role = formInformation.get('role').value;

    if (!this.signup.valid) {
      this.authSrv.generalAlert(
        'INVALID DATA ❌',
        'Please check the entered data and make sure you fill all the form',
        ['OK']
      );
    } else if (pass !== confirm_pass) {
      this.authSrv.generalAlert('MISMATCH ❌', 'Make sure passwords match', [
        'OK',
      ]);
    } else {
      this.authSrv.signUp(email, pass, first_name, last_name, phone, role);
    }
  }
}
