import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConformReservationPage } from './conform-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: ConformReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConformReservationPageRoutingModule {}
