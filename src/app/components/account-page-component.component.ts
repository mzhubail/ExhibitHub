import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
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
      <ion-row class="ion-margin d-flex flex-column align-items-center">
        <ion-label class="profile-avatar-text">Hi,</ion-label>
        <ion-card-subtitle class="profile-avatar-text"
          >{{ FirstName }} {{ LastName }}</ion-card-subtitle
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

        <ion-item
          class="ion-margin-vertical"
          (click)="redirectToChat()"
          *ngIf="UserRole === 'client'"
        >
          <ion-icon slot="start" name="chatbubble-outline"></ion-icon>
          <ion-label>Chat</ion-label>
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
  // Using get accessors for all of the needed info
  get userId(): string {
    const u = this.authServ.user;
    return u ? u.uid : '';
  }
  get FullNameInitials(): string {
    const u = this.authServ.userInfo;
    if (!u) return 'XX';
    return u?.First_Name.charAt(0) + u?.Last_Name.charAt(0);
  }
  get FirstName(): string {
    const u = this.authServ.userInfo;
    return u ? u.First_Name : '';
  }
  get LastName(): string {
    const u = this.authServ.userInfo;
    return u ? u.Last_Name : '';
  }

  /// User Role ///
  get UserRole(): string {
    const u = this.authServ.userInfo;
    return u ? u.Role : '';
  }

  constructor(public authServ: AuthenticationService, public router: Router) {}
  redirectToChangePassword() {
    this.router.navigateByUrl('/change-password');
  }
  redirectToMyDetails(uid: string) {
    this.router.navigate(['/my-details', uid]);
  }
  redirectToChat() {
    this.router.navigate(['/chat']);
  }
  ngOnInit() {}
}
