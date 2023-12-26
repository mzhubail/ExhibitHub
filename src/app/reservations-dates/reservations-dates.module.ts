import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationsDatesPageRoutingModule } from './reservations-dates-routing.module';

import { ReservationsDatesPage } from './reservations-dates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationsDatesPageRoutingModule
  ],
  declarations: [ReservationsDatesPage]
})
export class ReservationsDatesPageModule {}
