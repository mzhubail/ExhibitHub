import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.page.html',
  styleUrls: ['./my-details.page.scss'],
})
export class MyDetailsPage implements OnInit {
  userID!: string;
  DetailsForm: FormGroup;
  phoneRegex = /^((00 ?|\+)973 ?)?(?<num>(3\d|66)\d{6})$/;

  UserInfo = {
    UserID: '',
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Email: '',
  };

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public firestore: Firestore,
    public authServ: AuthenticationService,
    public navController: NavController,
  ) {
    this.DetailsForm = this.formBuilder.group({
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
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userID = params['id'];
      this.getUserInformation(this.userID);
    });
  }

  async getUserInformation(userID: string) {
    const docRef = doc(this.firestore, 'Users Information', userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();

      this.UserInfo = {
        UserID: this.userID,
        FirstName: userData['First_Name'],
        LastName: userData['Last_Name'],
        Email: userData['Email'],
        PhoneNumber: userData['Phone'],
      };

      this.DetailsForm.patchValue({
        first_name: this.UserInfo.FirstName,
        last_name: this.UserInfo.LastName,
        phone: this.UserInfo.PhoneNumber,
      });
    } else {
      console.log('Something went wrong!');
    }
  }

  changeDetails() {
    updateDoc(doc(this.firestore, 'Users Information', this.userID), {
      First_Name: this.DetailsForm.get('first_name')?.value,
      Last_Name: this.DetailsForm.get('last_name')?.value,
      Phone: this.DetailsForm.get('phone')?.value,
    }).then(() => {
      this.authServ.generalAlert('Success', 'Changes Saved!', [{
        text: 'Ok',
        handler: () => { this.navController.back(); }
      }]);
    });
  }
}
