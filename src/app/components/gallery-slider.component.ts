import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gallery-slider',
  template: `
    <ion-list lines="none" class="ion-justify-content-center">
      <ion-card>
        <div
          id="carouselExampleCaptions"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="4"
              aria-label="Slide 5"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="../assets/gallery1.jpeg"
                class="d-block w-100"
                style="border-radius:8px;"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="../assets/gallery2.jpeg"
                class="d-block w-100"
                style="border-radius:8px;"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="../assets/gallery3.jpeg"
                class="d-block w-100"
                style="border-radius:8px;"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="../assets/gallery4.jpeg"
                class="d-block w-100"
                style="border-radius:8px;"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="../assets/gallery5.jpeg"
                class="d-block w-100"
                style="border-radius:8px;"
                alt="..."
              />
            </div>
          </div>
        </div>
      </ion-card>
    </ion-list>
  `,
})
export class GallerySliderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
