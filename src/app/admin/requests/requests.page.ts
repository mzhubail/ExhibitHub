import { Component, OnInit } from '@angular/core';
import { ReservationService, Reservation } from '../../services/reservation.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  reservations$!: Observable<Reservation[]>;
  selectedSegment = 'pending';

  constructor(
    private reservation: ReservationService,
    public authService: AuthenticationService,
  ) {}

   ngOnInit() {
    this.reservation.getReservations().then(()=>{
      this.reservations$ = this.reservation.reservations$;
      console.log(this.reservations$);
    });
  }




}
