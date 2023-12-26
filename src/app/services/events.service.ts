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
import { CustomePageService, EventDesign } from './custome-page.service';
import { Reservation } from './reservation.service';


@Injectable({
  providedIn: 'root',
})
export class EventsService {
  public resAndEvents$!: Observable<ResAndEvent[]>;

  constructor(public firestore: Firestore, public custom:CustomePageService) {
    this.getResAndEvents().then(()=>{
      console.log(this.resAndEvents$);
    });

  }

  async getResAndEvents() {
    const events = await this.getEvents();
    const reservations = await this.getReservations();

    const combinedResAndEvents: ResAndEvent[] = [];


    events.forEach(async event => {
      const matchingReservation = reservations.find(
        reservation => reservation.id === event.id
      );

      if (matchingReservation) {
        // Get the image URL using the customService.getPosterURL method
        const imageUrl = await this.custom.getPosterURL(event.image);

        combinedResAndEvents.push({
          event: event, // Include the imageUrl in the event object
          reservation: matchingReservation,
          imageUrl: imageUrl,
        });
      }
    });

    this.resAndEvents$ = new Observable(observer => {
      observer.next(combinedResAndEvents);
      observer.complete();
    });




  }

  async getEvents(): Promise<EventDesign[]> {
    const queryCollection = collection(this.firestore, 'Events');
    const snapshot = await getDocs(queryCollection);
    const data: EventDesign[] = [];
    snapshot.forEach(doc => {
      const docData = doc.data() as EventDesign;
      docData.id = doc.id;
      data.push(docData);
    });
    return data;
  }

  async getReservations(): Promise<Reservation[]> {
    const queryCollection = collection(this.firestore, 'Reservations');
    const snapshot = await getDocs(queryCollection);
    const data: Reservation[] = [];
    snapshot.forEach(doc => {
      const docData = doc.data() as Reservation;
      docData.id = doc.id;
      data.push(docData);
    });
    return data;
  }



  
}



export interface ResAndEvent
{
  event: EventDesign;
  reservation:Reservation;
  imageUrl:string;
}
