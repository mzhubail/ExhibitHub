import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';
import { CustomePageService } from 'src/app/services/custome-page.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements AfterViewInit {

  @ViewChild('rectangle') rect!: ElementRef;

  constructor(private gestureCtrl: GestureController, public custPage: CustomePageService) { }

  public type!: string;
  public currentX!: number;
  public currentY!: number;

  ngAfterViewInit(): void { 
    this.updateGestures();
  }

  updateGestures() {
    const element = this.rect.nativeElement;
    let initialX = 0;
    let initialY = 0;

    const drag = this.gestureCtrl.create({
      el: element,
      threshold: 1,
      gestureName: 'drag',
      onStart: () => {
        initialX = element.getBoundingClientRect().left;
        initialY = element.getBoundingClientRect().top;
      },
      onMove: (ev) => {
        this.type = ev.type;
        this.currentX = initialX + ev.deltaX;
        this.currentY = initialY + ev.deltaY;
        element.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
        this.custPage.takeIndex(this.currentX, this.currentY)
      },
    });

    drag.enable();
  }
}
