import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CustomePageService {
  // constracor
  constructor() {}
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
    description: string;
  }[];
  itemsOrder: {
    id: string;
    position: number;
  }[];
}
