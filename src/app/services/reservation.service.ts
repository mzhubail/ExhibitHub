// @ts-nocheck
import { AlertController } from '@ionic/angular';
import { Firestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  CollectionReference,
  DocumentReference,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  docData,
  setDoc,
  addDoc,
  query,
  DocumentData,
} from '@angular/fire/firestore';

import { Observable, map, switchMap, of } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class ReservationService {

  public reservations$: Observable<any[]>;
  public filteredReservations$: Observable<any[]>;
  public halls$: Observable<any[]>;
  public filteredHalls$: Observable<any[]>;


  constructor(
    public alertCtrl: AlertController,
    public firestore: Firestore,
  ) {
    this.getReservations();
    this.getHalls();
  }

  
  // Create Data in Firestore with Add()
  addReservation(reservation): Promise<DocumentReference> {
    return addDoc(collection(this.firestore, 'Reservations'), reservation);
  }


  async getReservations() {
    const queryCollection = query(collection(this.firestore, 'Reservations'));
    this.reservations$ = collectionData(queryCollection, {
      idField: 'id',
    }) as Observable<any[]>;
  }

  async getHalls() {
    const queryCollection = query(collection(this.firestore, 'halls'));
    this.halls$ = collectionData(queryCollection, {
      idField: 'id',
    }) as Observable<any[]>;
    this.filteredHalls$ = this.halls$;
  }


  // Chosen by the client
  start_date: Date = new Date();
  end_date: Date = new Date();

  start_date_changed(event: any) {
    this.start_date = new Date(event.detail.value);
    this.filterHalls(); // Call filterHalls() when start_date changes
  }

  end_date_changed(event: any) {
    this.end_date = new Date(event.detail.value);
    this.filterHalls(); // Call filterHalls() when end_date changes
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

    const isReserved = reservedDates.has(
      currentDate.toISOString().split('T')[0]
    );

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

  check_conflict(
    chosenStartDate: Date,
    chosenEndDate: Date,
    existingReservations: any[]
  ) {
    for (const reservation of existingReservations) {
      const reservationStartDate = new Date(reservation.startDate);
      const reservationEndDate = new Date(reservation.endDate);

      const doesOverlap =
        chosenStartDate <= reservationEndDate &&
        chosenEndDate >= reservationStartDate;

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
    const chosenStartDate = new Date(this.start_date);
    const chosenEndDate = new Date(this.end_date);
    let conflict = this.check_conflict(
      chosenStartDate,
      chosenEndDate,
      this.CurrentReservations
    );
    if (conflict)
      this.generalAlert(
        'Conflict Alert',
        'The chosen start and end dates conflict with existing reservations.',
        ['OK']
      );
    else console.log('Whatever');
  }


  // written by the client 
  capacity: number;

  filterHalls() {
    if (!this.reservations$) {
      return;
    }
    this.filteredHalls$ = this.halls$;
    const start = this.start_date.toISOString().split('T')[0];
    const end = this.end_date.toISOString().split('T')[0];
    console.log(start);
    console.log(end);

    this.halls$
      .pipe(
        switchMap((halls) =>
          this.reservations$.pipe(
            map((reservations) => {
              return halls.filter((hall) => {
                const reservationsForHall = reservations.filter(
                  (reservation) => reservation.hall === hall.id
                );
                const hasReservation = reservationsForHall.some((reservation) =>
                  this.checkDateRangeOverlap(
                    start,
                    end,
                    reservation.start_date,
                    reservation.end_date
                  )
                );
                let capacity_set = true;
                if (this.capacity > 0) {
                  capacity_set = parseFloat(hall.capacity) >= this.capacity;
                  console.log(hall.capacity);
                  console.log(parseFloat(hall.capacity) >= this.capacity);
                }
                return !hasReservation && capacity_set;
              });
            })
          )
        )
      )
      .subscribe((filteredHalls) => {
        console.log(filteredHalls);
        this.filteredHalls$ = of(filteredHalls);
      });
  }

  checkDateRangeOverlap(
    start1: string,
    end1: string,
    start2: string,
    end2: string
  ): boolean {
    const startDate1 = new Date(start1);
    const endDate1 = new Date(end1);
    const startDate2 = new Date(start2);
    const endDate2 = new Date(end2);

    return startDate1 < endDate2 && endDate1 > startDate2;
  }
}

// exhibitor (client) interface
export interface Exhibitor {
  id?: string;
  name: string;
  email: string;
  phoneNumber: number;
  company: string;
}

//reservation interface
export interface Reservation {
  id?: string;
  exhibitorID: string;
  name: string;
  description: string;
  hall: string;
  start_date: string;
  end_date: string;
  status: string; //(approved/rejected/pending)
}
