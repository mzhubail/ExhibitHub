import { Component, OnInit } from '@angular/core';
import { Reservation, ReservationService } from '../services/reservation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.page.html',
  styleUrls: ['./view-reservations.page.scss'],
})
export class ViewReservationsPage implements OnInit {

  constructor(public reservation:ReservationService) { }

  reservations$!:Observable<Reservation[]>

  ngOnInit() {
    this.reservations$ = this.reservation.reservations$; 
  }



}
