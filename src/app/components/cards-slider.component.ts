import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService, ResAndEvent } from '../services/events.service';

@Component({
  selector: 'cards-slider',
  template: `
    <div>
      <swiper-container
        [slidesPerView]="1.1"
        [keyboard]="true"
        [centerSlides]="true"
      >
        <swiper-slide
          *ngFor="let elem of (this.service.resAndEvents$ | async)?.slice(0, 3)"
        >
          <ion-card>
            <ion-img class="swiper-img" src="{{ elem.imageUrl }}"></ion-img>

            <ion-card-content class="">
              <ion-card-subtitle class="ion-text-left">{{
                elem.event.title
              }}</ion-card-subtitle>
              <div style="display: flex" class="ion-text-left">
                <ion-icon
                  name="calendar-clear-sharp"
                  color="primary"
                ></ion-icon>
                <h2 style="margin: auto 10px">
                  {{ elem.reservation.start_date }} to
                  {{ elem.reservation.end_date }}
                </h2>
              </div>
              <div style="display: flex" class="ion-text-left">
                <ion-icon name="location-sharp" color="primary"></ion-icon>
                <h2 style="margin: auto 10px">
                  Location: Hall {{ elem.reservation.hall }}
                </h2>
              </div>
            </ion-card-content>
          </ion-card>
        </swiper-slide>
      </swiper-container>
    </div>
  `,
})
export class CardsSliderComponent implements OnInit {
  public resAndEvents$!: Observable<ResAndEvent[]>;

  constructor(public service: EventsService) {
    this.resAndEvents$ = this.service.resAndEvents$;
  }

  ngOnInit() {}
}
