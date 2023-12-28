import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';
@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.page.html',
  styleUrls: ['./ticket-details.page.scss'],
})
export class TicketDetailsPage implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    public ticketServ: TicketsService
  ) {}
  ticketID!: any;

  ngOnInit() {
    this.ticketID = this.activatedRoute.snapshot.paramMap.get('ticketID');
    this.ticketServ.findDataByID(this.ticketID);
  }
}
