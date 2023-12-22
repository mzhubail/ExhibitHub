import { Component, OnInit } from '@angular/core';
import { Event, ExploreEvents } from 'src/app/services/explore-events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  constructor(public exploreEvents: ExploreEvents) {}

  ngOnInit() {}
}
