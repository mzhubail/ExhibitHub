import { Injectable } from '@angular/core';

import {
  Storage,
  getDownloadURL,
  ref,
  uploadString,
} from '@angular/fire/storage';
import { Firestore } from '@angular/fire/firestore';
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
  DocumentSnapshot,
  query,
} from '@angular/fire/firestore';
import { DocumentData, getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CustomePageService {
  eventCollection: CollectionReference<DocumentData>;

  constructor(public storage: Storage, public fb: Firestore) {
    this.eventCollection = collection(
      fb,
      'Events'
    ) as CollectionReference<DocumentData>;
  }

  itemOrderArray: { id: string; position: number }[] = [];
  agendas: { date: Date; time: Date; description: string }[] = [];

  eventDesign: EventDesign = {
    id: '',
    color: '',
    title: '',
    image: '',
    eventDescription: '',
    price: 0,
    agenda: [],
    itemsOrder: [],
  };

  // see if the desing already exixst make the publish button false
  // findDesign(id: any) {
  //    if the id exixt return true else false
  // }

  async findDesign(id: string): Promise<boolean> {
    try {
      const eventCollectionDocumentRef: DocumentReference = doc(
        this.fb,
        'Events',
        id
      );
      const eventDocument: DocumentSnapshot<any> = await getDoc(
        eventCollectionDocumentRef
      );
      return eventDocument.exists();
    } catch (error) {
      console.error('no desing found', error);
      return false;
    }
  }

  showItemOrder(itemOrder: any[]) {
    this.itemOrderArray = itemOrder;
    // console.log(this.itemOrderArray);
  }

  addNewCustomEvent(customEventData: EventDesign): any {
    console.log(customEventData);
    const eventDoc = doc(this.eventCollection, customEventData.id);
    setDoc(eventDoc, customEventData);
  }

  /**
   * Uploads an image to firebase storage.
   *
   * @param imageData   Image encoded as base64-encoded url to upload
   * @returns  A Promise containing an UploadResult
   */
  uploadPoster(imageData: string) {
    const imageId = Math.floor(Math.random() * 100000000000).toString(36);
    const imageRef = ref(this.storage, 'posters/' + imageId);

    console.log(imageId);

    return uploadString(imageRef, imageData, 'data_url');
  }

  /**
   * Returns the image URL for the given image path
   * @param imagePath the full path of the poster
   * @returns A `Promise` that resolves with the download URL for this image.
   */
  getPosterURL(imagePath: string) {
    const imageRef = ref(this.storage, imagePath);
    return getDownloadURL(imageRef);
  }
}

export interface Agenda {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
}

export interface EventDesign {
  id: string;
  color: string;
  title: string;
  image: string;
  eventDescription: string;
  price: number;
  agenda: Agenda[];
  itemsOrder: {
    id: string;
    position: number;
  }[];
}
