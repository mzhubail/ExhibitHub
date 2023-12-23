import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(public reservation:ReservationService) { }

  ngOnInit() {
  }

}
