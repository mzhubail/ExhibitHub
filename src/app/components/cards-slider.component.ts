import { Component, OnInit } from '@angular/core';
import { IonCard } from '@ionic/angular';

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
          ><ion-card>
            <img src="assets/IMG_2275.jpg" />
            <ion-card-content class="">
              <ion-card-subtitle class="ion-text-left"
                >Jewellery Arabia</ion-card-subtitle
              >
              <div style="display: flex" class="ion-text-left">
                <ion-icon
                  name="calendar-clear-sharp"
                  color="primary"
                ></ion-icon>
                <h2 style="margin: auto 10px">11-14 November 2023</h2>
              </div>
              <div style="display: flex" class="ion-text-left">
                <ion-icon name="location-sharp" color="primary"></ion-icon>
                <h2 style="margin: auto 10px">Hall 6&7</h2>
              </div>
            </ion-card-content>
          </ion-card></swiper-slide
        >
        <swiper-slide
          ><ion-card>
            <img src="assets/IMG_2275.jpg" />
            <ion-card-content class="">
              <ion-card-subtitle class="ion-text-left"
                >Jewellery Arabia</ion-card-subtitle
              >
              <div style="display: flex" class="ion-text-left">
                <ion-icon
                  name="calendar-clear-sharp"
                  color="primary"
                ></ion-icon>
                <h2 style="margin: auto 10px">11-14 November 2023</h2>
              </div>
              <div style="display: flex" class="ion-text-left">
                <ion-icon name="location-sharp" color="primary"></ion-icon>
                <h2 style="margin: auto 10px">Hall 6&7</h2>
              </div>
            </ion-card-content>
          </ion-card></swiper-slide
        >
        <swiper-slide
          ><ion-card>
            <img src="assets/IMG_2275.jpg" />
            <ion-card-content class="">
              <ion-card-subtitle class="ion-text-left"
                >Jewellery Arabia</ion-card-subtitle
              >
              <div style="display: flex" class="ion-text-left">
                <ion-icon
                  name="calendar-clear-sharp"
                  color="primary"
                ></ion-icon>
                <h2 style="margin: auto 10px">11-14 November 2023</h2>
              </div>
              <div style="display: flex" class="ion-text-left">
                <ion-icon name="location-sharp" color="primary"></ion-icon>
                <h2 style="margin: auto 10px">Hall 6&7</h2>
              </div>
            </ion-card-content>
          </ion-card></swiper-slide
        >
      </swiper-container>
    </div>
  `,
})
export class CardsSliderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
