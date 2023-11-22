import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor() { }

startDate:any;
endDate:any;
  highlightedDates = (isoString:any) => {
    const currentDate = new Date(isoString);
  
    const reservedDates = this.CurrentReservations.reduce((acc, res) => {
      const start = new Date(res.startDate);
      const end = new Date(res.endDate);
  
      while (start <= end) {
        const dateString = start.toISOString().split('T')[0];
        acc.add(dateString);
        start.setDate(start.getDate() + 1);
      }
      return acc;
    }, new Set());
  
    const isReserved = reservedDates.has(currentDate.toISOString().split('T')[0]);
  
    return {
      textColor: '#ffffff',
      backgroundColor: isReserved ? 'red' : 'green',
      disabled: isReserved ? 'true' : 'false', // Disable the button for reserved dates
    };
  };
  
  
  CurrentReservations: any[] = [
    {
      startDate: '2023-12-01',
      endDate: '2023-12-05',
    },
    {
      startDate: '2023-12-10',
      endDate: '2023-12-15',
    },
  ];

  datePickerOptions = {
    highlightedDates: this.highlightedDates,
  };

  getSixMonthRange(fromDate: Date): { start: Date; end: Date } {
    const start = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);
    const end = new Date(fromDate.getFullYear(), fromDate.getMonth() + 6, 0);
    return { start: start, end: end };
  }

  generateCalendarStatusArray(
    existingReservations: any[],
    fromDate: Date
  ): { date: Date; isReserved: boolean }[] {
    const { start, end } = this.getSixMonthRange(fromDate);
    const calendarStatusArray: { date: Date; isReserved: boolean }[] = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      let isReserved = false;
      for (const reservation of existingReservations) {
        if (
          currentDate >= new Date(reservation.startDate) &&
          currentDate <= new Date(reservation.endDate)
        ) {
          isReserved = true;
          break;
        }
      }
      calendarStatusArray.push({ date: new Date(currentDate), isReserved });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return calendarStatusArray;
  }

}



