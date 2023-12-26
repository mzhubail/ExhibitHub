import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
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
