import { Injectable, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  getDoc,
  doc,
  where,
  limit,
  query,
  getDocs,
  setDoc,
  DocumentData,
  collectionData,
} from '@angular/fire/firestore';

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
  User,
  fetchSignInMethodsForEmail,
} from '@angular/fire/auth';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

export interface UserInfo {
  id?: string;
  Email: string;
  First_Name: string;
  Last_Name: string;
  Phone: string;
  Role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  UserCollection: CollectionReference<UserInfo>;
  actionCodeSettings: any;
  userMoveToUrl = 'new-password';

  // User related variables
  user!: User | null;
  userInfo!: UserInfo | null;
  users$!:Observable<UserInfo[]>

  get username() {
    return (this.userInfo)
      ? this.userInfo.First_Name + ' ' + this.userInfo.Last_Name
      : null;
  }

  constructor(
    public firestore: Firestore,
    public auth: Auth,
    public router: Router,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {

    this.UserCollection = collection(
      this.firestore,
      'Users Information'
    ) as CollectionReference<UserInfo>;

   this.getUsers();

    auth.onAuthStateChanged((user) => {
      // Set user
      this.user = user;
      if (this.user === null) return;
      console.log('Logged in with user', this.user.email);

      // Get userRole
      this.getUserInfo(this.user.uid).then((userInfo) => {
        if (!userInfo) {
          console.error(
            'User role was not retrieved correctly.\n\n Make sure that the ' +
              'corresponding userInfo for the user is stored in ' +
              "'User Information' with the same id as the current user id."
          );
        } else {
          this.userInfo = userInfo;

          if (this.router.url === '/log-in') this.redirectUser();
        }
      });
    });

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
      dynamicLinkDomain: 'mobileammz.page.link', // important
    };
  }

  signIn(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).catch(() => {
      this.generalAlert('Wrong Credentials', 'Incorrect Email or Password', [
        'OK',
      ]);
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
        this.generalAlert('Duplicate', 'The email entered already exists', [
          'OK',
        ]);
      } else {
        createUserWithEmailAndPassword(getAuth(), email, password).then(
          (userCredential) => {
            const user = userCredential.user;
            const userInfo: UserInfo = {
              Phone: phone,
              Email: email,
              First_Name: first_name,
              Last_Name: last_name,
              Role: role,
            };

            // Use setDoc to force userInfo to have the same identifier as uid
            setDoc(doc(this.UserCollection, user.uid), userInfo)
              .then(() => {
                this.generalAlert(
                  'Success',
                  'Your account has been created successfully',
                  [
                    {
                      text: 'OK',
                      handler: () => {
                        this.logInUser(user);
                      },
                    },
                  ]
                );
              })
              .catch(() => {
                user.delete().then(() => {
                  this.generalAlert(
                    'Fail',
                    'Sorry, your account cannot be created. Try again later',
                    ['OK']
                  );
                });
              });
          }
        );
      }
    });
  }

  /**
   * This is to be used to sign in a user when he is first created.
   *
   * @param user The new User
   */
  private logInUser(user: User) {
    this.auth
      .updateCurrentUser(user)
      .then(() => {
        // Do something
        this.redirectUser();
      })
      .catch((err) => {
        console.error(err);
        this.router.navigateByUrl('/log-in');
      });
  }


  /**
   * Redirect user to the interface corresponding to his role, or to '/' in case
   * the user has no role.
   */
  public redirectUser() {
    const role = this.userInfo?.Role ?? '';
    this.navCtrl.navigateForward('/' + role);
  }

  async checkDuplicate(email: string): Promise<boolean> {
    const userQuery = query(
      collection(this.firestore, 'Users Information'),
      where('Email', '==', email)
    );

    return getDocs(userQuery).then((querySnapshot: any) => {
      const numberOfDocs = querySnapshot.size;
      return numberOfDocs > 0 ? true : false;
    });
  }

  /**
   * @param userID Identifier of a user
   * @returns the userInfo associated with that user, or null in case there is none.
   */
  private async getUserInfo(userID: string): Promise<UserInfo | null> {
    const userInfoDoc = doc(this.UserCollection, userID);
    const x = await getDoc(userInfoDoc);
    return x.data() as UserInfo | null;
  }

  async getRoleByEmail(userEmail: string): Promise<string | undefined> {
    let role;
    const userQuery = query(
      collection(this.firestore, 'Users Information'),
      where('Email', '==', userEmail),
      limit(1)
    );
    const querySnapshot = await getDocs(userQuery);

    querySnapshot.forEach((doc: any) => {
      role = doc.data()['Role'];
    });

    return role;
  }

  signOut() {
    // use it wherever it necessary
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.navCtrl.navigateBack('/log-in');
      })
      .catch(() => {
        this.generalAlert('Fail', 'Sorry, there is a problem signing you out', [
          'OK',
        ]);
      });
  }

  signInEmail(user_email: string) {
    sendSignInLinkToEmail(getAuth(), user_email, this.actionCodeSettings)
      .then(() => {
        this.generalAlert(
          'Success',
          'A sign in link sent to your email successfully',
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
          'Sorry, something wrong happen. Try again later.',
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


  getUserID(): string {
    const user = getAuth().currentUser;
    let x: string = ''; // Default value (Will not be used)
    
    if (user && 'uid' in user) {
      x = user.uid; 
    }
  
    return x; // user id
  }


  resetPasswordEmail(user_email: string) {
    sendPasswordResetEmail(getAuth(), user_email, this.actionCodeSettings)
      .then(() => {
        this.generalAlert(
          'Success',
          'A password reset link has been sent to your email ' +
            user_email +
            ' successfully',
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
          'Sorry, something went wrong while sending the reset password email.',
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

  // Check if the email of auth user exists within auth accounts
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const auth = getAuth();
      const methods = await fetchSignInMethodsForEmail(auth, email);

      // If methods array has length > 0, email exists
      return methods.length > 0; 
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false; // Return false in case of any errors
    }
  }

  updatePassword(newPassword:string) {
    const auth = getAuth();
    const user = auth.currentUser;
    if(user!==null)
    updatePassword(user, newPassword).then(() => {
    this.generalAlert(
      'Success',
      'Your password has been updated successfully ✅',
      [
        {
          text: 'OK',
          handler: () => {
          },
        },
      ]
    );
  }).catch(()=>{
    this.generalAlert(
      'Fail',
      'Your password cannot be updated currently, try again later ❌',
      [
        {
          text: 'OK',
          handler: () => {
          },
        },
      ]
    );
  })
}

async getUsers() {
  const queryCollection = query(collection(this.firestore, 'Users Information'));
  this.users$ = collectionData(queryCollection, {
    idField: 'id',
  }) as Observable<UserInfo[]>;
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
