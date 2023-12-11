import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reservation, FBService } from 'src/app/fb.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.page.html',
  styleUrls: ['./create-reservation.page.scss'],
})
export class CreateReservationPage implements OnInit {
  newReservation: Reservation = {} as Reservation;
  reservationsForm: FormGroup = new FormGroup({});

  constructor(public FBService: FBService, public FormBuilder: FormBuilder) {
    this.reservationsForm = FormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      status: ['pending'],
    });
  }

  ngOnInit() {}

  AddReservation() {
    if (this.reservationsForm.valid) {
      this.newReservation = this.reservationsForm.value;
      this.FBService.addReservation(this.newReservation)
        .then((res) => {
          alert('Added Successfully');
        })
        .catch((err) => {
          console.log('Error in adding');
        });
    } else {
      alert('There are missing/wrong fields, Every field is required!!');
    }
  }
}
