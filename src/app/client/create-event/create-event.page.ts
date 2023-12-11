import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';
import { CustomEventService } from 'src/app/custom-event.service';
import { AlertController } from '@ionic/angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
 items = [
   {
     id: 1, content: `
     <ion-card>
  <img src="/assets/upload.png" alt="Item 1 image">
  </ion-card>
  ` },
  { id: 2, content: 'Item 2 content' },
  { id: 3, content: 'Item 3 content' },
];

  itemOrder: any[]=[];

  constructor(private customEventServ: CustomEventService,
    private alertController: AlertController,
  private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.itemOrder = this.items.slice(); // Populate the itemOrder array with a copy of the items
  }

   handleReorder(ev: CustomEvent<ItemReorderEventDetail>){
    const movedItem = this.itemOrder[ev.detail.from];
    this.itemOrder.splice(ev.detail.from, 1);
    this.itemOrder.splice(ev.detail.to, 0, movedItem);

    const moveArray = this.itemOrder.map((item) => ({ id: item.id, position: this.itemOrder.indexOf(item) }));
     console.log('Move Array:', moveArray);
     ev.detail.complete();
   }
  showElementAlert(event: MouseEvent) {
    const element = event.target as HTMLElement;
    const elementType = element.tagName.toLowerCase();

    console.log(`The clicked element is of type: ${elementType}`);
  }
}