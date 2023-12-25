import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { GestureController } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/angular';
import { IonItem } from '@ionic/angular';
import {
  Agenda,
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
export class CreateEventPage implements OnInit {
  reservationID: string = ''; //from url
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
  mycolor: string = 'medium';
  title!: string;
  image!: 'upload.png';
  price!: number;
  eventDescription: string = '';

  // from the service
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

  // Image Upload related
  @ViewChild('fileInput') imageInputElem!: ElementRef<HTMLInputElement>;
  @ViewChild('imageElem') imageElem!: ElementRef<HTMLImageElement>;
  /** Image data, stored as Base64-encoded data, with Data-URL declaration. */
  pickedImageData: string | undefined;


  constructor(
    private gestureCtrl: GestureController,
    public custPage: CustomePageService
  ) {}
  ngOnInit() {}

  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }

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
    this.itemsIndex = newIndexArray;
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
  public divs: Partial<Agenda>[] = [{
    time: undefined,
    date: undefined,
    description: '',
  }];


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
    const newDiv = {
      date: undefined,
      time: undefined,
      description: '',
      title: '',
    };

    this.divs.push(newDiv);
  }


  /** Open the file picker for image upload */
  triggerImagePicker(): void {
    this.imageInputElem.nativeElement.click();
  }


  /** Triggered when the user picks an image */
  handleImageChange(): void {
    const file = this.imageInputElem.nativeElement.files?.[0];
    if (!file)
      return;

    const reader = new FileReader();
    reader.onload = e => {
      if (!e.target)
        return;

      const selectedImageSrc = e.target.result;
      if (selectedImageSrc === null || selectedImageSrc instanceof ArrayBuffer) {
        console.log('I recieved a format I don\'t know how to deal with');
        return;
      }

      this.pickedImageData = selectedImageSrc;
    };

    reader.readAsDataURL(file);
  }


  pickColor(color: string) {
    this.mycolor = color;
  }


  attemptedToContinue = false;

  async createEventDesing() {
    this.attemptedToContinue = true;
    // save to service
    // Assign values to eventDesign instance

    for (let div of this.divs)
      if (
        div.title === undefined ||
        div.date === undefined ||
        div.time === undefined
      )
        return;

    // Upload picked image to firebase storage
    if (!this.pickedImageData)
      return;


    const snapshot = await this.custPage.uploadPoster(this.pickedImageData);
    this.eventDesign.image = snapshot.metadata.fullPath;


    this.eventDesign.reservationID = this.reservationID;
    this.eventDesign.color = this.mycolor;
    this.eventDesign.title = this.title;
    this.eventDesign.eventDescription = this.eventDescription;
    this.eventDesign.price = this.price;
    this.eventDesign.agenda = (this.divs as unknown) as Agenda[];
    this.eventDesign.itemsOrder = this.itemsIndex.map((item) => ({
      id: item.id,
      position: parseInt(item.index, 10), // Parse the index string to a number
    }));
    this.custPage.addNewCustomEvent(this.eventDesign);
  }
}
