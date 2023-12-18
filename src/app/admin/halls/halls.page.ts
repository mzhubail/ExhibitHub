import { Component, OnInit } from '@angular/core';
import { HallService, Hall } from 'src/app/services/hall.service';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.page.html',
  styleUrls: ['./halls.page.scss'],
})
export class HallsPage implements OnInit {

  constructor(public hallservice: HallService) {
    
  }

  ngOnInit() {
   
  }



}
