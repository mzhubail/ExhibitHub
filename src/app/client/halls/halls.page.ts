import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Hall, HallService } from 'src/app/services/hall.service';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.page.html',
  styleUrls: ['./halls.page.scss'],
})
export class HallsPage implements OnInit {
  // This will be set as soon as halls are retrieved from the database
  hallInfo!: Hall;

  constructor(public service: HallService) { 
    
  }

  async ngOnInit() {
    // firstValueFrom is a way to wait to wait for only the first time halls$
    // recieves data (updates are not relevant, for executing this.show(data)).
    await firstValueFrom(this.service.halls$)
    this.showData('1'); // Call showData() with default elementId '1' when the page loads
  }


  showData(elementId: string) {
    const hall = this.service.findHallById(elementId);
    if (!hall) {
      console.error(`Failed to retrieve hall info for hall.id = ${elementId}`);
      return;
    }
    this.hallInfo = hall;
  }

}


