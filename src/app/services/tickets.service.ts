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
  where,
  Query,
} from '@angular/fire/firestore';
import { DocumentData, onSnapshot } from 'firebase/firestore';
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
    ticketCode: '',
    agenda: [],
  };
  myTicket: Ticket = {
    id: '',
    eventID: '',
    userID: '',
    eventName: '',
    ticketCode: '',
    agenda: [],
  };

  // find hall

  getTickets() {
    const queryCollection = query(collection(this.db, 'Tickets'));
    this.tickets$ = collectionData(queryCollection, {
      idField: 'id',
    }) as Observable<Ticket[]>;
  }

  getuserTickets() {
    //  i know its duplicate, :(
    this.uid = this.authServ.user?.uid;
    const uid = this.uid;
    const queryCollection = query(
      collection(this.db, 'Tickets'),
      where('userID', '==', uid)
    );

    this.tickets$ = collectionData(queryCollection, {
      idField: 'id',
    }) as Observable<Ticket[]>;
  }
  id: any;
  async addTicket(event: any): Promise<DocumentReference> {
    this.id = event.id;
    this.ticket.eventID = event.id;
    this.ticket.eventName = event.title;
    this.ticket.agenda = event.agenda;
    this.ticket.ticketCode = this.generateRandomCode();
    this.uid = this.authServ.user?.uid;
    this.ticket.userID = this.uid;

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

  public unCS$: any;
  findDataByID(id: string) {
    this.unCS$ = onSnapshot(doc(this.db, 'Tickets', id), (snapshot: any) => {
      // document listener
      this.myTicket.id = id;
      this.myTicket.eventID = snapshot.data().eventID;
      this.myTicket.userID = snapshot.data().userID;
      this.myTicket.eventName = snapshot.data().eventName;
      this.myTicket.ticketCode = snapshot.data().ticketCode;
      this.myTicket.agenda = snapshot.data().agenda;

      // console.log('myTicket:', myTicket); // Output all the values of myTicket
    });
    this.unCS$ = this.myTicket;
    console.log(this.unCS$);
    console.log(this.unCS$);
    console.log(this.unCS$);
    console.log(this.unCS$);
  }
}

export interface Ticket {
  id?: string;
  eventID: string;
  userID: string;
  eventName: string;
  agenda: [];
  ticketCode: string;
}
