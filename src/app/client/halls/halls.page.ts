//@ts-nocheck
import { Component, OnInit } from '@angular/core';
import { Hall, HallService } from 'src/app/services/hall.service';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.page.html',
  styleUrls: ['./halls.page.scss'],
})
export class HallsPage implements OnInit {
  hallInfo: Hall = {};

  constructor(public service: HallService) { 
    
  }

  ngOnInit() {
    this.showData('1'); // Call showData() with default elementId '1' when the page loads

  }
   showData(elementId: string) {
    //  this.hallInfo = this.service.getHall(elementId);
     //  console.log(this.hallInfo);
       this.service.getHall(elementId)
    .then((hallInfo) => {
      this.hallInfo = hallInfo;
      console.log(this.hallInfo);
    })
    .catch((error) => {
      console.error('Error retrieving hall data:', error);
    });

  }

}


