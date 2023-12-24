import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ReservationService,Reservation } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.page.html',
  styleUrls: ['./create-reservation.page.scss'],
})
export class CreateReservationPage implements OnInit {
  newReservation: Reservation = {} as Reservation;
  reservationsForm: FormGroup = new FormGroup({});

  constructor(public reservation:ReservationService, public formBuilder: FormBuilder, public authSrv:AuthenticationService) {
    this.reservationsForm = formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      hall: ['', Validators.required],
      start_date: [this.reservation.start_date],
      end_date: [this.reservation.end_date],
    });
  }

  ngOnInit() {}


//   //reservation interface
// export interface Reservation {
//   id?: string;
//   exhibitorID: string;
//   name: string;
//   description: string;
//   hall: string;
//   start_date: Date;
//   end_date: Date;
//   status: string; //(approved/rejected/pending)
// }

empty(){
  this.reservationsForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    hall: ['', Validators.required],
    start_date: [this.reservation.start_date],
    end_date: [this.reservation.end_date],
  });
}

  AddReservation(res:any) {
    if (this.reservationsForm.valid) {
      
      let name = res.get('name').value;
      let exhibitor_id = this.authSrv.getUserID();
      let description = res.get('description').value;
      let hall = res.get('hall').value;
      let start_date = this.reservation.start_date.toISOString().split('T')[0];
      let end_date = this.reservation.end_date.toISOString().split('T')[0];
      this.newReservation = {
        name: name,
        exhibitorID: exhibitor_id,
        description:description,
        hall:hall,
        start_date:start_date,
        end_date:end_date,
        status:'pending',
      };

     let today:string = new Date().toISOString().split('T')[0]; 
      //  check if in the past 
      if(start_date>end_date){
          this.reservation.generalAlert('Invalid Range','The start date cannot be after the end date.',['OK']);
          return;
      }
      else if(start_date<today||end_date<today){
        this.reservation.generalAlert('Invalid Range','The dates cannot be in the past.',['OK']);
        return;
        // else if more than the availability give an alert  
      }

      this.reservation.addReservation(this.newReservation)
        .then((res) => {
         this.empty();
          this.reservation.generalAlert("Success",'Your reservation request has been sent successfully',['OK']);
        })
        .catch((err) => {
          console.log('Error in adding');
        });
    } else {
      this.reservation.generalAlert("Error",'There are missing/wrong fields',['OK']);
    }
  }
}
