import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signup;

  constructor(
    public formBuilder: FormBuilder,
    public authSrv: AuthenticationService,
    public router: Router
  ) {
    this.signup = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+.)+[\\w-]{2,4}$'),
        ]),
      ],

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
          Validators.pattern(this.phoneRegex),
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
      role: ['attendee'],
    });
  }

  ngOnInit() {}

  register(formInformation: any) {
    // check if mismatch. then check the validation as a whole

    let email = formInformation.get('email').value;
    let phone = this.parsePhoneNumber(formInformation.get('phone').value);
    let first_name = formInformation.get('first_name').value;
    let last_name = formInformation.get('last_name').value;
    let pass = formInformation.get('password').value;
    let confirm_pass = formInformation.get('confirm_password').value;
    let role = formInformation.get('role').value;

    if (!this.signup.valid || phone === undefined) {
      this.authSrv.generalAlert(
        'INVALID DATA',
        'Please check the entered data and make sure you fill all the form',
        ['OK']
      );
    } else if (pass !== confirm_pass) {
      this.authSrv.generalAlert('MISMATCH', 'Make sure passwords match', [
        'OK',
      ]);
    } else {
      this.authSrv.signUp(email, pass, first_name, last_name, phone, role);
    }
  }

  /* Phone regular expression
   * with optional country code and whitespaces, and number capture
   */
  phoneRegex = /^((00 ?|\+)973 ?)?(?<num>(3\d|66)\d{6})$/;

  /* Attempts to parse phone number */
  parsePhoneNumber(numberString: string): string | undefined {
    const match = numberString.match(
      /^((00 ?|\+)973 ?)?(?<num>(3\d|66)\d{6})$/
    );
    if (match == null) return;

    const parsedNumber = match.groups?.['num'];
    console.log('Parsed', numberString, 'as', parsedNumber);
    return parsedNumber;
  }
}
