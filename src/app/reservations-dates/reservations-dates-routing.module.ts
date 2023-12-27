import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationsDatesPage } from './reservations-dates.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationsDatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsDatesPageRoutingModule {}
