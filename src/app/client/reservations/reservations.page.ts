import { Component, OnInit } from '@angular/core';

import { Reservation, ReservationService } from 'src/app/services/reservation.service';
import { ClientReservationService } from 'src/app/services/client-reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  constructor(public reservationService: ClientReservationService) {}

  ngOnInit() {}

  ShowReservation() {}

  sortReservations(list: Reservation[]): Reservation[] {
    const listCopy = [...list];
    list.sort((r1, r2) => {
      const d1 = new Date(r1.start_date) ,
        d2 = new Date(r2.start_date);
      if (d1 < d2)
        return -1
      else if (d1 > d2)
        return +1
      else
        return 0;
    });
    return list;
  }
}
