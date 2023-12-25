import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  CollectionReference,
  DocumentReference,
} from '@angular/fire/firestore';
import {
  getDocs,
  getDoc,
  doc,
  DocumentSnapshot,
  deleteDoc,
  updateDoc,
  docData,
  setDoc,
  addDoc,
  query,
} from '@angular/fire/firestore';
import { DocumentData, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface UserInfo {
  UserId?: string;
  FirstName?: string;
  LastName?: string;
  Email?: string;
  PhoneNumber?: string;
}

@Component({
  selector: 'account-page-component',
  template: `
    <div class="more-page">
      <ion-row class="ion-margin d-flex flex-column align-items-center">
        <div class="profile-avatar">
          <!-- (first letter of user's first and last name) -->
          <ion-card-subtitle class="profile-avatar-title">{{
            FullNameInitials
          }}</ion-card-subtitle>
        </div>
      </ion-row>
      <ion-row
        class="ion-margin d-flex flex-column align-items-center"
        *ngFor="let u of user"
      >
        <ion-label class="profile-avatar-text">Hi,</ion-label>
        <ion-card-subtitle class="profile-avatar-text"
          >{{ u.FirstName }} {{ u.LastName }}</ion-card-subtitle
        >
      </ion-row>

      <ion-list class="ion-margin">
        <ion-item
          class="ion-margin-vertical"
          (click)="redirectToMyDetails(this.userId)"
        >
          <ion-icon slot="start" name="person-circle-outline"></ion-icon>
          <ion-label>My Details</ion-label>
          <ion-icon slot="end" name="chevron-forward"></ion-icon>
        </ion-item>
        <ion-item
          class="ion-margin-vertical"
          (click)="redirectToChangePassword()"
        >
          <ion-icon slot="start" name="lock-closed-outline"></ion-icon>
          <ion-label>Change Password</ion-label>
          <ion-icon slot="end" name="chevron-forward"></ion-icon>
        </ion-item>
        <ion-item class="ion-margin-vertical" (click)="this.authServ.signOut()">
          <ion-icon slot="start" name="log-out-outline"></ion-icon>
          <ion-label>Sign Out</ion-label>
          <ion-icon slot="end" name="chevron-forward"></ion-icon>
        </ion-item>
      </ion-list>
    </div>
  `,
})
export class AccountPageComponentComponent implements OnInit {
  userId: string = ''; //for functions usages
  FullNameInitials: string = ''; //avatar letters

  public user: UserInfo[] = [];

  constructor(
    public firestore: Firestore,
    public authServ: AuthenticationService,
    public router: Router
  ) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        this.userId = user.uid;
        this.getUserInformation(uid);
        console.log('User information', this.user);

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  async getUserInformation(userID: string) {
    const docRef = doc(this.firestore, 'Users Information', userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();

      this.FullNameInitials =
        userData['First_Name'].charAt(0) + userData['Last_Name'].charAt(0);

      this.user.push({
        UserId: this.userId,
        FirstName: userData['First_Name'],
        LastName: userData['Last_Name'],
        Email: userData['Email'],
        PhoneNumber: userData['Phone'],
      });
    } else {
      console.log('User not found!');
    }
  }

  redirectToChangePassword() {
    this.router.navigateByUrl('/change-password');
  }

  redirectToMyDetails(uid: string) {
    this.router.navigate(['/my-details', uid]);
  }

  ngOnInit() {}
}
