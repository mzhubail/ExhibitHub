import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  collection,
  CollectionReference,
  addDoc,
  getDoc,
  doc,
  where,
  limit,
  query,
  getDocs,
} from '@angular/fire/firestore';

import { DocumentData } from 'firebase/firestore';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendSignInLinkToEmail,
  onAuthStateChanged,
} from '@angular/fire/auth';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  UserCollection: CollectionReference<DocumentData>;

  constructor(
    public firestore: Firestore,
    public auth: Auth,
    public router: Router,
    public alertCtrl: AlertController
  ) {
  }

  signIn(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        let userID = credentials.user.uid;
        this.getRole(userID).then((role:string) => {
          if (role == 'client') this.router.navigateByUrl('/client');
          else if (role == 'attendee') this.router.navigateByUrl('/attendee');
          else{
            this.router.navigateByUrl('/chat');
          }
        });

      })
      .catch(() => {
        this.generalAlert(
          'Wrong Credentials',
          'Incorrect Email or Password ❌',
          ['OK']
        );
      });
  }

  signUp(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone: string,
    role: string
  ) {
    createUserWithEmailAndPassword(getAuth(), email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        this.UserCollection = collection(this.firestore, 'Users Information');

        ////////////////////////////////////////
        // before adding the email go and check if th email exists show an error message and exit from the function
        ////////////////////////////////////////////////////////////////////////////////////////

        addDoc(this.UserCollection, {
          UserID: user.uid,
          Phone: phone,
          Email: email,
          First_Name: first_name,
          Last_Name: last_name,
          Role: role,
        })
          .then(() => {
            this.generalAlert(
              'Success',
              'Your account has been created successfully ✅',
              [
                  {
                    text: 'OK',
                    handler: () => {
                      this.router.navigateByUrl("/log-in");
                    }
                  }
                ]
            );

          })
          .catch(() => {
            user.delete().then(() => {
              this.generalAlert(
                'Fail',
                'Sorry, your account cannot be created. Try again later ❌',
                ['OK']
              );
            });
          });
      }
    );
  }

  changeAuth() { // for all pages except home, login and signup
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        this.router.navigateByUrl('/home');
      }
    });
  }

   async getRole(userID: string) {
    let role:string;
    const userQuery = query(collection(this.firestore, 'Users Information'), where('UserID', '==', userID), limit(1));
     await getDocs(userQuery).then((querySnapshot:any) => {
      querySnapshot.forEach((doc:any) => {
        role = doc.data()['Role'];
      });
    }).catch(() => {
      // nothing
    });

    return role;
  }

  signOut() { // use it wherever it necessary  
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.changeAuth();
      })
      .catch(() => {
        this.generalAlert(
          'Fail',
          'Sorry, there is a problem signing you out ❌',
          ['OK']
        );
      });
  }

  resetPassword() {
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
