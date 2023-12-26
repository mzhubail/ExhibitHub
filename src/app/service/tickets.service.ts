import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, query } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  constructor(public firestore: Firestore) {
    this.getTickets();
  }

  public tickets$!: Observable<Ticket[]>;

  getTickets() {
    const queryCollection = query(collection(this.firestore, 'Tickets'));
    this.tickets$ = collectionData(queryCollection, {
      idField: 'id',
    }) as Observable<Ticket[]>;
  }
}

export interface Ticket {
  id?: string;
  // other fields
}
