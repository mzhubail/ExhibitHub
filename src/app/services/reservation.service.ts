import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  CollectionReference,
  DocumentReference,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  docData,
  setDoc,
  addDoc,
  query,
  DocumentData,
} from '@angular/fire/firestore';

import { Observable, map, switchMap, of, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  CurrentReservations: Reservation[] = [];
  public reservations$!: Observable<Reservation[]>;
  public filteredReservations$!: Observable<Reservation[]>;
  public halls$!: Observable<any[]>;
  public filteredHalls$!: Observable<any[]>;
  

  constructor(public alertCtrl: AlertController, public firestore: Firestore) {
    this.getReservations();
    this.getHalls();
    this.countReservationsBasedOnStatus();
  }


  async getReservations() {
    const queryCollection = query(collection(this.firestore, 'Reservations'));
    this.reservations$ = collectionData(queryCollection, {
      idField: 'id',
    }) as Observable<any[]>;
    this.filteredReservations$ = this.reservations$;
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
    

      // Create Data in FireStore with Add()
      addReservation(reservation:Reservation): Promise<DocumentReference> {
        return addDoc(collection(this.firestore, 'Reservations'), reservation);
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

  // written by the client
  capacity!: number;
  resetHall!:string|null;
  filterHalls(capacity?:any) {
    if(capacity)
    this.capacity = capacity.target.value;
    if (!this.reservations$) {
      return;
    }
    this.resetHall = null;
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


  async getHallByID(id:any){
    let hall = await getDoc(doc(this.firestore,'halls',id))
    return hall.data();
  }

   searchReservations(event:any){
      const searchTerm = event.target.value.toLowerCase().trim();
      if (!searchTerm) {
        this.filteredReservations$ = this.reservations$; 
        return; // exit
      }
      this.filteredReservations$ = this.reservations$.pipe(
        debounceTime(300), 
        map((reservations) => {
          return reservations.filter((reservation) =>
            reservation.name.toLowerCase().includes(searchTerm)
          );
        })
      );
  }


  pendingCount$!:Observable<number>;
  rejectedCount$!:Observable<number>;
  approvedCount$!:Observable<number>;
  countReservationsBasedOnStatus() {
    this.pendingCount$ = this.filteredReservations$.pipe(
      map(reservations => reservations.filter(reservation => reservation.status === 'pending').length)
    );

    this.rejectedCount$ = this.filteredReservations$.pipe(
      map(reservations => reservations.filter(reservation => reservation.status === 'rejected').length)
    );

    this.approvedCount$ = this.filteredReservations$.pipe(
      map(reservations => reservations.filter(reservation => reservation.status === 'approved').length)
    );
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
