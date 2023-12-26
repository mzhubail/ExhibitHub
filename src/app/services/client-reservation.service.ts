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
  public reservations!: Reservation[];
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
    const uid = this.authServ.user?.uid;
    if (!uid) {
      this.authServ.redirectUser();
      return;
    }

    const q = query(this.ReservationCollection, where('exhibitorID', '==', uid));
    const reservations$ = collectionData(q, { idField: 'id' });
    reservations$.subscribe(r => {
      this.reservations = r;
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
