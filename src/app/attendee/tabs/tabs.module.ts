import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AttendeeTabsRoutingModule } from './attendee-tabs-routing.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, AttendeeTabsRoutingModule],
  declarations: [TabsPage],
})
export class TabsPageModule {}
