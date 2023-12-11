import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(public formBuilder:FormBuilder) { }

  ngOnInit() {

    this.validation();

  }

  // I've edited "strict" to false in ts-config.json
  signup: FormGroup;

  validation() {
    this.signup = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
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
          Validators.pattern('^(00|\\+)973(3|6)\\d{7}$'),
        ]),
      ],

      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$'),
        ]),
      ],

      confirm_password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$'),
        ]),
        // check if there is a mismatch
        // this.passwordMismatchValidator.bind(this),
      ],

    }); 
  }

  
  passwordMismatchValidator(): { [key: string]: boolean } | null {
    const password = this.signup.get('password')?.value;
    const confirmPassword = this.signup.get('confirm_password')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  register(formInformation:any){
    

    

  }




}



