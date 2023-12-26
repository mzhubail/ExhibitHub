import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  UserInfo,
} from '../../services/authentication.service';
import {
  Reservation,
  ReservationService,
} from 'src/app/services/reservation.service';
import { Observable } from 'rxjs';
import { collection, query } from 'firebase/firestore';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Ticket, TicketsService } from 'src/app/service/tickets.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  constructor(
    public authSrv: AuthenticationService,
    public reservation: ReservationService,
    public ticketSrv: TicketsService, 
    public firestore: Firestore
  ) {}

  reservations_no!: number;
  users_no!: number;
  tickets_no!: number;
  reservations$!: Observable<Reservation[]>;
  tickets$!: Observable<Ticket[]>;
  users$!: Observable<UserInfo[]>;
  pendingCount$!:Observable<number>;
  rejectedCount$!:Observable<number>;
  approvedCount$!:Observable<number>;
  pendingCount!:number;
  rejectedCount!:number;
  approvedCount!:number;
  pendingPercentage!:number;
  rejectedPercentage!:number;
  approvedPercentage!:number;

  ngOnInit() {
    this.reservations$ = this.reservation.reservations$;
    this.users$ = this.authSrv.users$;
    this.tickets$ = this.ticketSrv.tickets$;
    this.pendingCount$ = this.reservation.pendingCount$;
    this.rejectedCount$ = this.reservation.rejectedCount$;
    this.approvedCount$ = this.reservation.approvedCount$;


  this.reservations$.subscribe(reservations => {
    this.reservations_no = reservations.length; 
    this.calculatePercentages();
  });

  this.reservation.pendingCount$.subscribe(count => {
    this.pendingCount = count;
    this.calculatePercentages();
  });

  this.reservation.rejectedCount$.subscribe(count => {
    this.rejectedCount = count;
    this.calculatePercentages();
  });

  this.reservation.approvedCount$.subscribe(count => {
    this.approvedCount = count;
    this.calculatePercentages();
  });
}

calculatePercentages() {
  if (this.reservations_no > 0) {
    this.pendingPercentage = (this.pendingCount / this.reservations_no) * 100;
    this.rejectedPercentage = (this.rejectedCount / this.reservations_no) * 100;
    this.approvedPercentage = (this.approvedCount / this.reservations_no) * 100;
  } else {
    this.pendingPercentage = 0;
    this.rejectedPercentage = 0;
    this.approvedPercentage = 0;
  }


  }


  }



