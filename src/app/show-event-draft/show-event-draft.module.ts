import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowEventDraftPageRoutingModule } from './show-event-draft-routing.module';

import { ShowEventDraftPage } from './show-event-draft.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowEventDraftPageRoutingModule
  ],
  declarations: [ShowEventDraftPage]
})
export class ShowEventDraftPageModule {}
