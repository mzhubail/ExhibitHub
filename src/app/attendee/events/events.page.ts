import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EventsService, ResAndEvent } from 'src/app/services/events.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  public resAndEvents$!: Observable<ResAndEvent[]>;

  constructor(
    public eventsService: EventsService,
  ) {
    this.resAndEvents$ = this.eventsService.resAndEvents$;
  }

   ngOnInit() {

  }


}
