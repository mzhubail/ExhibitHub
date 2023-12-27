import { Injectable } from '@angular/core';
// AngularFire
import {
  Firestore,
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
  getDoc,
  query,
} from '@angular/fire/firestore';
import { DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  uid: any;
  constructor(public db: Firestore, public authServ: AuthenticationService) {
    this.getTickets();
  }

  public tickets$!: Observable<Ticket[]>;
  ticket: Ticket = {
    userID: '',
    eventID: '',
    eventName: '',
    // hall: '',
    ticketCode: '',
    // validFrom: '',
    // validTo: '',
  };

  // find hall

  getTickets() {
    const queryCollection = query(collection(this.db, 'Tickets'));
    this.tickets$ = collectionData(queryCollection, {
      idField: 'id',
    }) as Observable<Ticket[]>;
  }

  async addTicket(event: any): Promise<DocumentReference> {
    this.ticket.eventID = event.id;
    this.ticket.eventName = event.title;
    this.ticket.ticketCode = this.generateRandomCode();
    this.uid = this.authServ.user?.uid;
    this.ticket.userID = this.uid;
    console.log(this.ticket);
    return addDoc(collection(this.db, 'Tickets'), this.ticket);
  }

  generateRandomCode(): string {
    const length = 10; // Define the length of the random code
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }
}

export interface Ticket {
  id?: string;
  eventID: string;
  userID: string;
  eventName: string;
  // hall: string;
  ticketCode: string;
  // validFrom: string;
  // validTo: string;
}
