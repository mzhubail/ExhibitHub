import { Injectable } from '@angular/core';

import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class CustomePageService {
  constructor(
    public storage: Storage,
  ) {}

  itemOrderArray: { id: string; position: number }[] = [];
  agendas: { date: Date; time: Date; description: string }[] = [];

  eventDesign: EventDesign = {
    id: '',
    reservationID: '',
    color: '',
    title: '',
    image: '',
    eventDescription: '',
    price: 0,
    agenda: [],
    itemsOrder: [],
  };

  showItemOrder(itemOrder: any[]) {
    this.itemOrderArray = itemOrder;
    // console.log(this.itemOrderArray);
  }

  showAgenda(agenda: any) {
    let item = agenda;
    // console.log(this.agendas);
    this.agendas = item;
  }

  addNewCustomEvent(customEventData: EventDesign) {
    console.log(customEventData);
    this.eventDesign = customEventData;
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

    return uploadString(imageRef, imageData, 'data_url')
  }


  /**
   * Returns the image URL for the given image path
   * @param imagePath the full path of the poster
   * @returns A `Promise` that resolves with the download URL for this image.
   */
  getPosterURL(imagePath: string) {
    const imageRef = ref(this.storage, imagePath);
    return getDownloadURL(imageRef)
  }
}

export interface EventDesign {
  id: string;
  reservationID: string; // from URL
  color: string;
  title: string;
  image: string;
  eventDescription: string;
  price: number;
  agenda: {
    date: string;
    time: string;
    // end date
    description: string;
  }[];
  itemsOrder: {
    id: string;
    position: number;
  }[];
}
