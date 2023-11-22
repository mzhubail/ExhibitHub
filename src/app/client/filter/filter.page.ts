import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../../services/client-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(public client:ClientServiceService) { }

  ngOnInit() {
  }

}
