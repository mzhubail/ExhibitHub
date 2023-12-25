import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyDetailsPageRoutingModule } from './my-details-routing.module';

import { MyDetailsPage } from './my-details.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyDetailsPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [MyDetailsPage],
})
export class MyDetailsPageModule {}
