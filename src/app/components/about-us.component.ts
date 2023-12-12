import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'about-us',
  template: `
    <ion-list lines="none" class="">
      <ion-list-header>
        <ion-label>About Us</ion-label>
      </ion-list-header>

      <ion-text>
        <div>
          Exhibition World Bahrain is a stunning piece of architecture that
          embraces the rich Arabic art and culture within its design. An
          innovative, flexible and adaptable space that is able to cater to
          every type of event from large conventions and exhibitions to
          meetings, entertainment, concerts, gala, events and celebrations.
          <br />
          <br />
          Exhibition World Bahrain is proudly managed by ASM Global, the world’s
          leading venue and event strategy management company, connecting people
          through the power of live experience.
        </div>
      </ion-text>
    </ion-list>
  `,
})
export class AboutUsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
