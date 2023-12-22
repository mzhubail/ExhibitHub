import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account-page-component',
  template: `
    <div class="more-page">
      <ion-row class="ion-margin d-flex flex-column align-items-center">
        <div class="profile-avatar">
          <!-- (first letter of user's first and last name) -->
          <ion-card-subtitle class="profile-avatar-title">AY</ion-card-subtitle>
        </div>
      </ion-row>
      <ion-row class="ion-margin d-flex flex-column align-items-center">
        <ion-label class="profile-avatar-text">Hi,</ion-label>
        <ion-card-subtitle class="profile-avatar-text"
          >Ahmed Yusuf</ion-card-subtitle
        >
      </ion-row>

      <ion-list class="ion-margin">
        <ion-item class="ion-margin-vertical">
          <ion-icon slot="start" name="person-circle-outline"></ion-icon>
          <ion-label>My Details</ion-label>
          <ion-icon slot="end" name="chevron-forward"></ion-icon>
        </ion-item>
        <ion-item class="ion-margin-vertical">
          <ion-icon slot="start" name="lock-closed-outline"></ion-icon>
          <ion-label>Change Password</ion-label>
          <ion-icon slot="end" name="chevron-forward"></ion-icon>
        </ion-item>
        <ion-item class="ion-margin-vertical">
          <ion-icon slot="start" name="log-out-outline"></ion-icon>
          <ion-label>Sign Out</ion-label>
          <ion-icon slot="end" name="chevron-forward"></ion-icon>
        </ion-item>
      </ion-list>
    </div>
  `,
})
export class AccountPageComponentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
