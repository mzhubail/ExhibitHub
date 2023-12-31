// the change color is not working for now i will now afterInit and try
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import {
  CustomePageService,
  EventDesign,
} from 'src/app/services/custome-page.service';
import { Reservation } from 'src/app/services/reservation.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  constructor(
    public customService: CustomePageService,
    public firestore: Firestore,
    public activatedRoute: ActivatedRoute,
    public ticketService: TicketsService,
    public AuthServ: AuthenticationService
  ) {}

  res_id!: string;
  reservation!: Reservation; //1
  event!: EventDesign; // 2
  imgURL!: string; // 3

  // Zeena:
  eventTitle: string = 'eventTitle';
  poster: string = 'poster';
  description: string = 'description';
  price: string = 'price';
  agenda: string = 'agenda';

  async ngOnInit() {
    this.res_id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.imgURL = this.activatedRoute.snapshot.paramMap.get('url') || '';

    getDoc(doc(this.firestore, 'Reservations', this.res_id || '')).then(
      (reservation: any) => {
        this.reservation = reservation.data();
      }
    );

    getDoc(doc(this.firestore, 'Events', this.res_id || '')).then(
      (event: any) => {
        this.event = event.data();
      }
    );
  }

  sortItems(list: { id: string; position: number }[]) {
    const listCopy = [...list];
    listCopy.sort((_a, _b) => {
      const a = _a.position;
      const b = _b.position;
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    });
    return listCopy;
  }
  // color
  @ViewChild('myDiv', { static: true }) myDivRef!: ElementRef;

  selected: any[] = []; // Array to store selected div elements
  totalPrice = 0;

  // selectAgenda(div: any) {
  //   const index = this.selected.indexOf(div);

  //   if (index === -1) {
  //     this.selected.push(div);
  //     this.totalPrice = this.totalPrice - this.event.price;
  //   } else {
  //     this.selected.splice(index, 1);
  //     if (this.totalPrice > 0)
  //       this.totalPrice = this.totalPrice - this.event.price;
  //     else this.totalPrice = 0;
  //   }
  //   console.log(this.selected);
  // }

  // book(event: any) {
  //   this.ticketService.addTicket(event);
  // }
  book(event: any) {
    this.ticketService
      .addTicket(event)
      .then(() => {
        this.AuthServ.generalAlert(
          'Message',
          'Your ticket booked successfully',
          ['OK']
        );
      })
      .catch((error) => {
        // Error occurred while adding the ticket
        console.error('Error booking ticket:', error);
        window.alert('You are already rejestered for this event');
      });
  }
}
