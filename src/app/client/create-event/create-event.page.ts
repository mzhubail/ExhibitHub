import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GestureController } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/angular';
import { IonItem } from '@ionic/angular';
import { Agenda, EventDesign } from 'src/app/services/custome-page.service';
import { convertErrorsToMessage } from 'src/app/utilities';
import { CustomePageService } from 'src/app/services/custome-page.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  showalert() {
    alert('clicke');
  }
  reservationID: any; //from url
  designExists: any;

  colorsList: string[] = [
    'danger',
    'success',
    'warning',
    'medium',
    'tertiary',
    'tint',
    'primary',
    'primary-tint',
  ];
  itemsIndex: ItemsIndex[] = [
    {
      id: 'eventTitle',
      index: '0',
    },
    {
      id: 'poster',
      index: '1',
    },
    {
      id: 'description',
      index: '2',
    },
    {
      id: 'price',
      index: '3',
    },
    {
      id: 'agenda',
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

  eventForm;

  constructor(
    private gestureCtrl: GestureController,
    public custPage: CustomePageService,
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public AuthServ: AuthenticationService
  ) {
    this.eventForm = formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
      eventDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(120),
        ],
      ],
      price: [
        0,
        [
          Validators.required,
          Validators.min(20),
          Validators.max(100),
          Validators.pattern(/^\d+$/),
        ],
      ],
    });
  }
  ngOnInit() {
    this.reservationID = this.activatedRoute.snapshot.paramMap.get('id');
    // okay find the id of the reservationID in events if there make the
    // working fine but i will try to take the data this time to display them
    // this.custPage
    //   .findDesign(this.reservationID)
    //   .then((result: boolean) => {
    //     if (result) {
    //       console.log('desing exists');
    //       this.designExists = true;
    //     } else {
    //       console.log('design does not exist');
    //       this.designExists = false;
    //     }
    //   })
    //   .catch((error: any) => {
    //     // Handle error if the findDesign function fails
    //     console.error('Error finding design:', error);
    //   });
    this.custPage
      .findDesign(this.reservationID)
      .then((result: any) => {
        if (result) {
          // console.log(result);
          this.designExists = true;
          this.AuthServ.generalAlert(
            'Message',
            'This event has already been published. You can only view it.',
            ['OK']
          );
          // display the data
          this.eventDesign = result;
          this.mycolor = this.eventDesign.color;
          this.title = this.eventDesign.title;
          this.eventDescription = this.eventDesign.eventDescription;
          this.price = this.eventDesign.price;
          this.divs = this.eventDesign.agenda;
          this.custPage.getPosterURL(this.eventDesign.image).then((url) => {
            this.pickedImageData = url;
          });
          console.log(this.divs);
        } else {
          this.pickedImageData = 'assets/upload.png';
          console.log('design does not exist');
          this.designExists = false;
        }
      })
      .catch((error: any) => {
        // do nothing let the user create the desing
        this.AuthServ.generalAlert(
          'Great News!',
          'Now you can customize the page that will be presented to people exploring your event. Feel free to customize it however you want.',
          ['OK']
        );
        console.error('Error finding design:', error);
      });
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
    this.itemsIndex = newIndexArray;
    console.log(this.itemsIndex);
  }

  showId(item: IonItem) {
    // nothing
  }

  public divs: Partial<Agenda>[] = [
    {
      startTime: undefined,
      date: undefined,
      description: '',
    },
  ];

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
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target) return;

      const selectedImageSrc = e.target.result;
      if (
        selectedImageSrc === null ||
        selectedImageSrc instanceof ArrayBuffer
      ) {
        console.log("I recieved a format I don't know how to deal with");
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
    this.eventDesign.id = this.reservationID;

    this.attemptedToContinue = true;
    this.additionalMessages = [];
    // save to service
    // Assign values to eventDesign instance
    const newDivs: Agenda[] = [];

    // Validate agenda and parse time and date
    for (let div of this.divs) {
      if (
        div.title === undefined ||
        div.date === undefined ||
        div.startTime === undefined ||
        div.endTime === undefined ||
        div.description === undefined
      ) {
        console.error('Missing data in', div);
        return;
      }

      // If it doesn't work just delete it, don't give me a headache.
      if (new Date(div.startTime) > new Date(div.endTime)) {
        this.additionalMessages.push('Start time has to be before end time');
        return;
      }

      const newDate = div.date.split('T')[0];
      const newStartTime = div.startTime.split('T')[1];
      const newEndTime = div.endTime.split('T')[1];

      newDivs.push({
        date: newDate,
        description: div.description,
        startTime: newStartTime,
        endTime: newEndTime,
        title: div.title,
      });
    }

    // Upload picked image to firebase storage
    if (!this.pickedImageData) {
      this.additionalMessages.push('You have to upload a poster');
      return;
    }
    const snapshot = await this.custPage.uploadPoster(this.pickedImageData);
    this.eventDesign.image = snapshot.metadata.fullPath;

    // Attributes from the formGroup
    let fromForm = this.eventForm.value;
    this.eventDesign.id = this.reservationID;
    this.eventDesign.color = this.mycolor;
    this.eventDesign.title = fromForm.title as string;
    this.eventDesign.eventDescription = fromForm.eventDescription as string;
    this.eventDesign.price = fromForm.price as number;
    this.eventDesign.agenda = newDivs as unknown as Agenda[];
    this.eventDesign.itemsOrder = this.itemsIndex.map((item) => ({
      id: item.id,
      position: parseInt(item.index, 10), // Parse the index string to a number
    }));
    console.log(this.eventDesign);
    this.custPage.addNewCustomEvent(this.eventDesign);
  }

  titleIsValid = (t: string | undefined) =>
    t !== undefined && t.length > 4 && t.length < 20;

  descriptionIsValid = (d: string | undefined) =>
    d === undefined || d.length === 0 ? true : d.length > 4 && d.length < 100;

  additionalMessages: string[] = [];
  errorMessages() {
    let m,
      messages = [...this.additionalMessages];
    const { eventDescription, price, title } = this.eventForm.controls;

    if (
      (m = convertErrorsToMessage('Event desctiption', eventDescription.errors))
    )
      messages.push(m);
    if ((m = convertErrorsToMessage('Price', price.errors))) messages.push(m);
    if ((m = convertErrorsToMessage('Title', title.errors))) messages.push(m);

    return messages;
  }
}
