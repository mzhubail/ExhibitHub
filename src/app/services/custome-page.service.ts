import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CustomePageService {
  // constracor
  constructor() {}
  itemOrderArray: { id: string; position: number }[] = [];
  agendas: { date: Date; time: Date; description: string }[] = [];

  showItemOrder(itemOrder: any[]) {
    this.itemOrderArray = itemOrder;
    // console.log(this.itemOrderArray);
  }

  showAgenda(agenda: any) {
    let item = agenda;
    // console.log(this.agendas);
    this.agendas = item;
  }
}

export interface EventDesign {
  id: string;
  eventID: string;
  color: string;
  title: string;
  image: string;
  eventDescription: string;
  price: number;
  agenda: {
    date: string;
    time: string;
    description: string;
  };
  itemsOrder: any[];
}
