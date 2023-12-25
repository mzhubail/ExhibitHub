import { Component, OnInit } from '@angular/core';

import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  constructor(public resevServ: ReservationService) {}

  ngOnInit() {}

  ShowReservation() {}
}
