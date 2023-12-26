import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReservationsPageRoutingModule } from './view-reservations-routing.module';

import { ViewReservationsPage } from './view-reservations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReservationsPageRoutingModule
  ],
  declarations: [ViewReservationsPage]
})
export class ViewReservationsPageModule {}
