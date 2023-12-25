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
    // Do nothing
  }


  public divs: Partial<Agenda>[] = [{
    time: undefined,
    date: undefined,
    description: '',
  }];

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
      ) {
        console.error('Missing data in', div);
        return;
      }

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


  titleIsValid = (t: string | undefined) =>
    t !== undefined && t.length > 4 && t.length < 20;

  descriptionIsValid = (d: string | undefined) =>
    (d === undefined || d.length === 0)
      ? true
      : d.length > 4 && d.length < 100;
}
