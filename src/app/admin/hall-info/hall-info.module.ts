import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { HallInfoPageRoutingModule } from './hall-info-routing.module';

import { HallInfoPage } from './hall-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HallInfoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HallInfoPage]
})
export class HallInfoPageModule {}
