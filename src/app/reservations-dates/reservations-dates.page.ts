import { Component, OnInit } from '@angular/core';
import {
  ReservationService,
  Reservation,
} from '../services/reservation.service';

@Component({
  selector: 'app-reservations-dates',
  templateUrl: './reservations-dates.page.html',
  styleUrls: ['./reservations-dates.page.scss'],
})
export class ReservationsDatesPage implements OnInit {
  reservations: Reservation[] = [];
  constructor(public resSrv: ReservationService) {}

  ngOnInit() {}

  highlightedDates: any={};
  datePickerOptions: any={};

  async filterCalender(hall: string) {
    this.reservations = [];
    this.reservations = await this.resSrv.getReservationsByHall(hall);

    this.highlightedDates = (isoString: any) => {
      const currentDate = new Date(isoString);
      const reservedDates = this.reservations.reduce((acc, res) => {
        const start = new Date(res.start_date);
        const end = new Date(res.end_date);
        while (start <= end) {
          const dateString = start.toISOString().split('T')[0];
          acc.add(dateString);
          start.setDate(start.getDate() + 1);
        }
        return acc;
      }, new Set());
      const isReserved = reservedDates.has(
        currentDate.toISOString().split('T')[0]
      );
      return {
        textColor: '#ffffff',
        backgroundColor: isReserved ? 'rgb(231, 76, 60)': 'rgb(46, 204, 113)',
      };
    };


    this.datePickerOptions = {
      highlightedDates: this.highlightedDates,
    };
  }
}
