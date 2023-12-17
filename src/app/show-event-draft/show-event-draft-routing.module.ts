import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowEventDraftPage } from './show-event-draft.page';

const routes: Routes = [
  {
    path: '',
    component: ShowEventDraftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowEventDraftPageRoutingModule {}
