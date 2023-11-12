import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestDeeplinksPage } from './test-deeplinks.page';

const routes: Routes = [
  {
    path: '',
    component: TestDeeplinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestDeeplinksPageRoutingModule {}
