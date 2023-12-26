import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  Timestamp,
  Unsubscribe,
  addDoc,
  collection,
  collectionData,
  collectionGroup,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  DocumentReference,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ClientReservationService {
  public reservations: Reservation[] = [];
  ReservationCollection: CollectionReference<Reservation>;
  constructor(
    public authServ: AuthenticationService,
    public firestore: Firestore
  ) {
    {
      this.ReservationCollection = collection(
        this.firestore,
        'Reservations'
      ) as CollectionReference<Reservation>;
      // this.getEvents();
      this.getReservations();
    }
  }
  clientId!: string;
  clientID = this.authServ.getUserID();

  // zeena: i will take my id for now, because i dont know what the problem with the authServ
  userID = '8aOGmsElZOauMZHMONJpETipXdB3';

  ngonInit() {}
  private async getReservations() {
    const querySnapshot = await getDocs(
      query(this.ReservationCollection, where('exhibitorID', '==', this.userID))
    );

    querySnapshot.forEach((doc) => {
      const reservation = doc.data();
      const reservationWithId = { ...reservation, id: doc.id }; // Add the ID to the reservation object
      this.reservations.push(reservationWithId);
      console.log(reservationWithId);
    });
  }
}

export interface Reservation {
  id?: string;
  description: string;
  status: string;
  start_date: string;
  exhibitorID: string;
  hall: string;
  name: string;
  end_date: string;
}
