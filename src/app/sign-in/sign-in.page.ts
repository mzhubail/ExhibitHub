import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WasSubmittedService } from '../services/was-submitted.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  providers: [WasSubmittedService],
})
export class SignInPage implements OnInit {
  loginForm;

  constructor(
    formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(64), Validators.minLength(8),]],
      name: ['', [Validators.required, Validators.maxLength(64), Validators.minLength(2),]],
      password: ['', [Validators.required, Validators.minLength(8),]],
      passwordConfirm: ['', [Validators.required, ]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(66|3\d)\d{4}$/)]],
    })
  }

  ngOnInit() {
  }

  submitForm() {
    console.log("form was submitted!");
  }
}
