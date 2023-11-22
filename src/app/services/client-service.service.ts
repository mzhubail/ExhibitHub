import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(public alertCtrl: AlertController) {
  }


  

  // This retrieved from the database
  CurrentReservations: any[] = [
    {
      startDate: new Date('2023-12-01'),
      endDate: new Date('2023-12-05'),
    },
    {
      startDate: new Date('2023-12-10'),
      endDate: new Date('2023-12-23'),
    },
  ];

   
  

  // Chosen by the client 
  startDate: Date = new Date();
  endDate: Date = new Date();

  startDateChanged(event: any) {
    this.startDate = event.detail.value;
    console.log(this.startDate);
  }

  endDateChanged(event: any) {
    this.endDate = event.detail.value;
    console.log(this.endDate);
  }


  // Show the reserved dates
  highlightedDates = (isoString: any) => {
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
    };
  };


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



  check_conflict(chosenStartDate: Date, chosenEndDate: Date, existingReservations: any[]) {
    for (const reservation of existingReservations) {
      const reservationStartDate = new Date(reservation.startDate);
      const reservationEndDate = new Date(reservation.endDate);

      const doesOverlap = (
        chosenStartDate <= reservationEndDate && 
        chosenEndDate >= reservationStartDate
      );

      if (doesOverlap) {
        return true;
      }
    }
    return false;
  }



  async generalAlert(
    header: string,
    message: string,
    buttons: any,
    inputs?: any
  ) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: buttons,
      inputs: inputs,
    });
    await alert.present();
  }



  fake_submit() {
    const chosenStartDate = new Date(this.startDate);
  const chosenEndDate = new Date(this.endDate);
    let conflict = this.check_conflict(chosenStartDate, chosenEndDate, this.CurrentReservations)
    if (conflict)
      this.generalAlert(
        'Conflict Alert',
        'The chosen start and end dates conflict with existing reservations.',
        ['OK']
      );
      else
      console.log('Whatever');
  }




}







