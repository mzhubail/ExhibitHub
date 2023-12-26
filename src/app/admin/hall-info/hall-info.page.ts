import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallService, Hall } from 'src/app/services/hall.service';

import {
  FormControlName,
  FormBuilder,
  FormGroup,
  Validators,
  Validator,
} from '@angular/forms';
import { NavController } from '@ionic/angular';

import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-hall-info',
  templateUrl: './hall-info.page.html',
  styleUrls: ['./hall-info.page.scss'],
})
export class HallInfoPage implements OnInit {
  hallInfo!: Hall;

  HallForm: FormGroup;

  constructor(
    public service: HallService,
    public authServ: AuthenticationService,
    public ActRouter: ActivatedRoute,
    public formbuilder: FormBuilder,
    public navController: NavController,
    public firestore: Firestore
  ) {
    this.HallForm = formbuilder.group({
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20)]),
      ],
      description: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      capacity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ]),
      ],
      booths: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ]),
      ],
      price: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ]),
      ],
      availability: ['', Validators.required],
    });
  }

  ngOnInit() {
    let id = this.ActRouter.snapshot.paramMap.get('id');
    if (id === null) {
      this.navController.navigateRoot('/');
      return;
    }

    const hall = this.service.findHallById(id);
    if (!hall) {
      this.navController.navigateRoot('/');
      return;
    }

    this.hallInfo = hall;
    console.log(this.hallInfo);

    this.HallForm.patchValue({
      name: this.hallInfo.name,
      description: this.hallInfo.description,
      capacity: this.hallInfo.capacity,
      booths: this.hallInfo.booths,
      price: this.hallInfo.price,
      availability: this.hallInfo.availability,
    });
  }

  updateHall() {
    updateDoc(doc(this.firestore, 'halls', this.hallInfo.id), {
      name: this.HallForm.get('name')?.value,
      description: this.HallForm.get('description')?.value,
      capacity: this.HallForm.get('capacity')?.value,
      booths: this.HallForm.get('booths')?.value,
      price: this.HallForm.get('price')?.value,
      availability: this.HallForm.get('availability')?.value,
    })
      .then(() => {
        this.authServ.generalAlert('Success', 'Changes Saved!', ['Ok']);
      })
      .catch(() => {
        this.authServ.generalAlert(
          'Fail',
          'Could not update hall information!',
          ['Ok']
        );
      });
  }
}
