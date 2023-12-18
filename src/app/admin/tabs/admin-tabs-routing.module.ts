import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'admin/tabs',
    component: TabsPage,
    children: [
      {
        path: 'chat',
        loadChildren: () =>
          import('../chat/chat.module').then((m) => m.ChatPageModule),
      },
      {
        path: 'halls',
        loadChildren: () =>
          import('../halls/halls.module').then((m) => m.HallsPageModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('../reports/reports.module').then((m) => m.ReportsPageModule),
      },
      {
        path: 'requests',
        loadChildren: () =>
          import('../requests/requests.module').then(
            (m) => m.RequestsPageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'admin/tabs/requests',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [TabsPage],
})
export class AdminTabsRoutingModule {}
