import { Injectable, OnInit } from '@angular/core';
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
  updatePassword,
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendSignInLinkToEmail,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from '@angular/fire/auth';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  UserCollection: CollectionReference<DocumentData>;
  actionCodeSettings: any;
  userMoveToUrl = 'new-password';
  urole: string;
  constructor(
    public firestore: Firestore,
    public auth: Auth,
    public router: Router,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {
    this.actionCodeSettings = {
      url: 'http://localhost:8100/log-in', // important  
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios',
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12',
      },
      dynamicLinkDomain: 'mobileammz.page.link',  // important  
    };
    //  this.x= getAuth().currentUser.uid;
  }
x:string;
  signIn(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        let userID = credentials.user.uid;
        this.getRole(userID).then((role: string) => {
          this.router.navigateByUrl('/' + role);
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
    this.checkDuplicate(email).then((isDuplicate) => {
      if (isDuplicate) {
        this.generalAlert('Duplicate', 'The email entered already exists', ['OK']);
      } else {
        createUserWithEmailAndPassword(getAuth(), email, password).then(
          (userCredential) => {
            const user = userCredential.user;
            this.UserCollection = collection(this.firestore, 'Users Information');
  
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
                [{
                  text: 'OK',
                  handler: () => {
                    this.router.navigateByUrl('/log-in');
                  },
                }]
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
    });
  }
  

  changeAuth() {
    // for all pages except home, login and signup
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        this.router.navigateByUrl('/home');
      }
    });
  }


  

  async checkDuplicate(email: string): Promise<boolean> {
    const userQuery = query(
      collection(this.firestore, 'Users Information'),
      where('Email', '==', email));

    return getDocs(userQuery)
      .then((querySnapshot: any) => {
        const numberOfDocs = querySnapshot.size;
        return numberOfDocs > 0 ? true : false;
      });
  }

  async getRole(userID: string) {
    let role: string;
    const userQuery = query(
      collection(this.firestore, 'Users Information'),
      where('UserID', '==', userID),
      limit(1)
    );
    await getDocs(userQuery)
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          role = doc.data()['Role'];
        });
      })
      .catch(() => {
        // nothing
      });

    return role;
  }

  async getRoleByEmail(userEmail: string) {
    let role: string;
    const userQuery = query(
      collection(this.firestore, 'Users Information'),
      where('Email', '==', userEmail),
      limit(1)
    );
    await getDocs(userQuery)
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          role = doc.data()['Role'];
        });
      })
      .catch(() => {
        // nothing
      });

    return role;
  }

  signOut() {
    // use it wherever it necessary
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

  signInEmail(user_email: string) {
    sendSignInLinkToEmail(getAuth(), user_email, this.actionCodeSettings)
      .then(() => {
        this.generalAlert(
          'Success',
          'A sign in link sent to your email successfully ✅',
          [
            {
              text: 'OK',
              handler: () => {
                // nothing
              },
            },
          ]
        );
        window.localStorage.setItem('emailForSignIn', user_email);
      })
      .catch((error) => {
        this.generalAlert(
          'Sending Fail', // free firebase has limited sign in quota 
          'Sorry, something wrong happen. Try again later. ❌',
          [
            {
              text: 'OK',
              handler: () => {
                this.navCtrl.navigateBack('/log-in');
              },
            },
          ]
        );
        console.log(error);
      });
  }


  resetPasswordEmail(user_email: string) {
    sendPasswordResetEmail(getAuth(), user_email, this.actionCodeSettings)
      .then(() => {
        this.generalAlert(
          'Success',
          'A password reset link has been sent to your email successfully ✅',
          [
            {
              text: 'OK',
              handler: () => {
                // nothing 
              },
            },
          ]
        );
      })
      .catch((error) => {
        this.generalAlert(
          'Error',
          'Sorry, something went wrong while sending the reset password email. ❌',
          [
            {
              text: 'OK',
              handler: () => {
                this.navCtrl.navigateBack('/log-in');
              },
            },
          ]
        );
        console.log(error);
      });
  }
  

  // updatePassword() {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   const newPassword = 'new-password';

  //   updatePassword(user,newPassword).then(() => {
  //   this.generalAlert(
  //     'Success',
  //     'Your password has been updated successfully ✅',
  //     [
  //       {
  //         text: 'OK',
  //         handler: () => {
  //           this.router.navigateByUrl('/log-in');
  //         },
  //       },
  //     ]
  //   );
  // })
  // .catch(() => {
  //   this.generalAlert(
  //     'Fail',
  //     'Sorry, cannot update your password currently. Try again later ❌',
  //     [
  //       {
  //         text: 'OK',
  //         handler: () => {
  //           this.router.navigateByUrl('/log-in');
  //         },
  //       },
  //     ]
  //   );
  // });
  // }

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
