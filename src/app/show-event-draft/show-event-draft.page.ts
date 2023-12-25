import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CustomePageService } from '../services/custome-page.service';

@Component({
  selector: 'app-show-event-draft',
  templateUrl: './show-event-draft.page.html',
  styleUrls: ['./show-event-draft.page.scss'],
})
export class ShowEventDraftPage implements AfterViewInit {
  constructor(
    public custPage: CustomePageService,
  ) {}

  ngAfterViewInit() {}
}
