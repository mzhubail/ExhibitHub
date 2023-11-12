import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestDeeplinksPageRoutingModule } from './test-deeplinks-routing.module';

import { TestDeeplinksPage } from './test-deeplinks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestDeeplinksPageRoutingModule
  ],
  declarations: [TestDeeplinksPage]
})
export class TestDeeplinksPageModule {}
