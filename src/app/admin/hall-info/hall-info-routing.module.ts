import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HallInfoPage } from './hall-info.page';

const routes: Routes = [
  {
    path: '',
    component: HallInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HallInfoPageRoutingModule {}
