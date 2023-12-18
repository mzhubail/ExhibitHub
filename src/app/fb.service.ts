// @ts-nocheck
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

// AngularFire
import {
  collection,
  collectionData,
  CollectionReference,
  DocumentReference,
} from '@angular/fire/firestore';

import {
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  docData,
  setDoc,
  addDoc,
  query,
} from '@angular/fire/firestore';

import { DocumentData } from 'firebase/firestore';


import {
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  docData,
  setDoc,
  addDoc,
  query,
} from '@angular/fire/firestore';

import { Observable, map, switchMap, of } from 'rxjs';
import { Firestore } from 'firebase/firestore';

//exhabitor (client) interface
export interface Exhabitor {
  id: string;
  name: string;
  email: string;
  phoneNumber: number;
  company: string;
}

//reservation interface
export interface Reservation {
  id: string;
  exhabitorID: string; //foriegn key from exhabitor collection
  name: string;
  description: string;
  location: string; // Should be changed to hall (Better Description), also the filtering considered it as "hall" not "location"
  start_date: Date;
  end_date: Date;
  status: string; //(approved/rejected/pending)
}

//event interface
export interface Event {
  id: string;
  reeservationID: string; //foriegn key from reservation collection
  name: string;
  description: string;
  poster: string;
  date: Date;
  time: string;
  duration: number;
  prefferedColor: string;
  others: string; //made it for pdf file link (needs discussion, may be deleted later)
}

@Injectable({
  providedIn: 'root',
})
export class FBService {
  // 2. Arrays of any
  public reservations: any[] = [];

  // 3. Observable arrays
  public reservations$: Observable<Reservation[]>;

  // 4. Collection reference
  resevationCollection: CollectionReference<DocumentData>;

  constructor(public firestore: Firestore) {
    // get a reference to the members collection
    this.reservationCollection = collection(this.firestore, 'Reservations');

    this.getReservations(); // get members as observable
    this.getHalls();

    this.getReservationsCopy(); // get members by copy into array
  }

  // async getReservations() {
  //   const q = query(collection(this.firestore, 'Reservations'));
  //   this.reservations$ = collectionData(q, { idField: 'id' }) as Observable<
  //     reservations[]
  //   >;
  // }

  async getReservationsCopy() {
    const querySnapshot = await getDocs(
      collection(this.firestore, 'Reservations')
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots //console.log(doc.id, " => ", doc.data());
      this.reservations.push(doc.data());
    });
  }

  // Create Data in Firestore with Add()
  addReservation(reservation): Promise<DocumentReference> {
    return addDoc(collection(this.firestore, 'Reservations'), reservation);
  }

  // // Create Member in Firestore with updateDoc()
  // updateMember(member: Member): Promise<DocumentReference> {
  //   return setDoc(doc(this.firestore, 'Members', member.id), {
  //     StudentID: member.studentID,
  //     FirstName: member.firstName,
  //     LastName: member.lastName,
  //     Age: member.age,
  //     Gender: member.gender,
  //     Major: member.major,
  //     PhoneNumber: member.phoneNumber,
  //     Email: member.email,
  //   });
  //   //when updating the member by update button, the data did't show in the list
  // }

  // // Delete Document Data in Firestore with deleteDoc()
  // deleteMember(res: Member): Promise<void> {
  //   return deleteDoc(doc(this.firestore, 'Members', member.id));
  // }



  public reservations$: Observable<any[]>;
  public filteredReservations$: Observable<any[]>;
  public halls$: Observable<any[]>;
  public filteredHalls$: Observable<any[]>;

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
                  (reservation) => reservation.location === hall.id
                );
                const hasReservation = reservationsForHall.some((reservation) =>
                  this.checkDateRangeOverlap(
                    start,
                    end,
                    reservation.start_date,
                    reservation.end_date
                  )
                );
                return !hasReservation;
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


