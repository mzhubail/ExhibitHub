//@ts-nocheck
import { Injectable } from '@angular/core';
// AngularFire
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
import { Observable } from 'rxjs';

//event interface
export interface Event {
  id?: string;
  reservationID?: string; //foriegn key from reservation collection
  name: string;
  description: string;
  poster?: string;
  date: Date;
  time?: string;
  hall: string;
  duration?: number;
  prefferedColor?: string;
  others?: string; //made it for pdf file link (needs discussion, may be deleted later)
}

@Injectable({
  providedIn: 'root',
})
export class ExploreEvents {
  // public hall$: Observable<Hall[]>;
  public eventData: Event;
  public events: any = [];
  public events$: Observable<Event[]>;
  EventsCollection: CollectionReference<DocumentData>;

  constructor(public firestore: Firestore) {
    this.EventsCollection = collection(this.firestore, 'Events');
    this.getEvents();
  }

  async getEvents() {
    const querySnapshot = await getDocs(collection(this.firestore, 'Events'));
    querySnapshot.forEach((doc) => {
      this.events.push(doc.data());
      console.log(doc.data());
    });
  }
}
