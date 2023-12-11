import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendSignInLinkToEmail,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public firestore: Firestore, public auth: Auth, public router:Router, public alertCtrl:AlertController) { 
    this.changeAuth();
  }



  signIn(email: string, password: string) {
    const auth = getAuth(); 
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        this.router.navigateByUrl('/home');
      })
      .catch(() => {
        this.generalAlert(
          'Wrong Credentials',
          'Incorrect Email or Password ❌',
          ['OK'],
        );
      });
  }

  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const userID = userCredential.user.uid; // getting user id
        this.generalAlert(
          'Success',
          'Your account has been created successfully ✅',
          ['OK'],
        );
      })
      .catch(() => {
        this.generalAlert(
          'Fail',
          'Sorry, your account cannot be created. Try again later ❌',
          ['OK'],
        );
      });
  }


  changeAuth() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
                this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }


  signOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // nothing changeAuth will handle the redirection 
      })
      .catch(() => {
        this.generalAlert(
          'Fail',
          'Sorry, there is a problem signing you out ❌',
          ['OK'],
        );
      });
  }


resetPassword(){
  // later
}



async generalAlert(
  header: string,
  message: string,
  buttons: any,
  inputs?: any
) {
  const alert = await this.alertCtrl.create({
    header: header,
    message: message,
    buttons: buttons,
    inputs: inputs,
  });
  await alert.present();
}




}
