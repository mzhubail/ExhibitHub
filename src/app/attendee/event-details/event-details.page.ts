import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import {
  CustomePageService,
  EventDesign,
} from 'src/app/services/custome-page.service';
import { Reservation } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  constructor(
    public customService: CustomePageService,
    public firestore: Firestore,
    public activatedRoute: ActivatedRoute
  ) {}

  res_id!: string;
  reservation!: Reservation; //1
  event!: EventDesign; // 2
  imgURL!: string; // 3

  async ngOnInit() {
    this.res_id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.imgURL = this.activatedRoute.snapshot.paramMap.get('url') || '';


    getDoc(doc(this.firestore, 'Reservations', this.res_id || '')).then(
      (reservation: any) => {
        this.reservation = reservation.data();
      }
    );

    getDoc(doc(this.firestore, 'Events', this.res_id || '')).then(
      (event: any) => {
        this.event = event.data();
      }
    );



  }
}
