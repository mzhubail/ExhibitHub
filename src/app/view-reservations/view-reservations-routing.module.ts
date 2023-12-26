import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReservationsPage } from './view-reservations.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReservationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReservationsPageRoutingModule {}
