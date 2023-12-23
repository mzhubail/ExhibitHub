import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/angular';
import { IonItem } from '@ionic/angular';
import {
  CustomePageService,
  EventDesign,
} from 'src/app/services/custome-page.service';

interface ItemsIndex {
  id: string;
  index: string;
}

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements AfterViewInit {
  colorsList: string[] = ['danger', 'success', 'warning', 'medium'];
  itemsIndex: ItemsIndex[] = [
    {
      id: '0',
      index: '0',
    },
    {
      id: '1',
      index: '1',
    },
    {
      id: '2',
      index: '2',
    },
    {
      id: '3',
      index: '3',
    },
    {
      id: '4',
      index: '4',
    },
  ];

  customEvent: EventDesign[] = [];
  // stop here want to save data
  mycolor!: string;
  title!: string;
  price!: number;

  @ViewChild('item0')
  item0!: IonItem;
  @ViewChild('item1')
  item1!: IonItem;
  @ViewChild('item2')
  item2!: IonItem;
  @ViewChild('item3')
  item3!: IonItem;
  @ViewChild('item4')
  item4!: IonItem;

  // @ViewChild('item0') item0!: ElementRef;
  // @ViewChild('item1') item1!: ElementRef;
  // @ViewChild('item2') item2!: ElementRef;
  // @ViewChild('item3') item3!: ElementRef;
  // @ViewChild('item4') item4!: ElementRef;
  constructor(
    private gestureCtrl: GestureController,
    public custPage: CustomePageService
  ) {}

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const movedItem = this.itemsIndex[ev.detail.from];
    this.itemsIndex.splice(ev.detail.from, 1);
    this.itemsIndex.splice(ev.detail.to, 0, movedItem);

    const newIndexArray = this.itemsIndex.map((item) => ({
      id: item.id,
      index: this.itemsIndex.indexOf(item).toString(),
    }));

    ev.detail.complete();
    this.custPage.showItemOrder(newIndexArray);
  }

  showId(item: IonItem) {
    // const itemId = item.el.id;
    // console.log('Clicked item ID:', itemId);
  }
  // showId(item: ElementRef) {
  //   const itemId = item.nativeElement.id;
  //   console.log('Clicked item ID:', itemId);
  // }

  public isDatePickerOpen = false;
  public selectedDate: any;
  date: any;
  time: any;
  description: string = '';
  public divs: any[] = [];

  toggleDatePicker() {
    this.isDatePickerOpen = !this.isDatePickerOpen;
    if (this.selectedDate) {
      const dateObject = new Date(this.selectedDate);
      this.date = dateObject.toISOString().split('T')[0];

      const timeObject = new Date(this.selectedDate);
      const hours = timeObject.getHours().toString().padStart(2, '0');
      const minutes = timeObject.getMinutes().toString().padStart(2, '0');
      this.time = `${hours}:${minutes}`;
    } else {
      this.selectedDate = '';
    }
  }

  addDiv() {
    let dateValue = this.date;
    let timeValue = this.time;
    let descriptionValue = this.description;

    const newDiv = {
      date: dateValue,
      time: timeValue,
      description: descriptionValue,
    };

    this.divs.push(newDiv);
    console.log(this.divs);

    this.date = '';
    this.time = '';
    this.description = '';

    this.custPage.showAgenda(this.divs);
  }

  triggerImageUpload(): void {
    const inputElement = document.getElementById('imageInput');
    if (inputElement) {
      inputElement.click();
    }
  }

  handleImageUpload(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const uploadedImageSrc = e.target.result;
        const imageElement = document.getElementById(
          'uploadedImage'
        ) as HTMLImageElement;
        if (imageElement) {
          imageElement.src = uploadedImageSrc;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  pickColor(color: string) {
    this.mycolor = color;
  }

  createEventDesing() {}
}
