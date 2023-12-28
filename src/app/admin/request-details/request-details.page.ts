import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Reservation, ReservationService } from 'src/app/services/reservation.service';
import { updateDoc } from 'firebase/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.page.html',
  styleUrls: ['./request-details.page.scss'],
})
export class RequestDetailsPage implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    public firestore: Firestore,
    public reservations:ReservationService,
    public navController: NavController,
  ) { }

  res_id!: string;
  reservation!: Reservation;

  async ngOnInit() {
    // get reservation by id clicked and display the details of that reservation
    // approved or reject are just buttons to change the status of the reservation and save it into the firebase
    this.res_id = this.activatedRoute.snapshot.paramMap.get('id')||'';
    getDoc(
      doc(this.firestore, 'Reservations', this.res_id || '')
    ).then((reservation:any)=>{
      this.reservation = reservation.data();
    });
  }

  updateReservation(status:string)
  { 
    // get the document reference by the of that document id 
    let DocumentRef = doc(this.firestore, 'Reservations', this.res_id);
    
     updateDoc(DocumentRef, {
     status:status,
    }).then(()=>{
      this.reservations.generalAlert('Updated', 'The status of the reservation request has been updated successfully',
      [{
          text: 'Ok',
          handler: () => { this.navController.back(); },
        }]
      );
    });
  }
  


}
