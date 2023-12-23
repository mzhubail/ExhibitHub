// @ts-nocheck
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CustomePageService, color } from '../services/custome-page.service';

@Component({
  selector: 'app-show-event-draft',
  templateUrl: './show-event-draft.page.html',
  styleUrls: ['./show-event-draft.page.scss'],
})
export class ShowEventDraftPage implements AfterViewInit {
  public x = this.custPage.xx;
  public y = this.custPage.yy;

  public color = this.custPage.color;

  @ViewChild('rectangle') rect: ElementRef;

  constructor(public custPage: CustomePageService) {}

  ngAfterViewInit() {}
}
