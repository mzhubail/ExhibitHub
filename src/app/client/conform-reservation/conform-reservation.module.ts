import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConformReservationPageRoutingModule } from './conform-reservation-routing.module';

import { ConformReservationPage } from './conform-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConformReservationPageRoutingModule
  ],
  declarations: [ConformReservationPage]
})
export class ConformReservationPageModule {}
