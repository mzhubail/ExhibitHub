import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'client/tabs',
    component: TabsPage,
    children: [
      // {
      //   path: 'account',
      //   loadChildren: () =>
      //     import('../account/account.module').then((m) => m.AccountPageModule),
      // },
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('../reservations/reservations.module').then(
            (m) => m.ReservationsPageModule
          ),
      },
      {
        path: 'halls',
        loadChildren: () =>
          import('../halls/halls.module').then((m) => m.HallsPageModule),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('../chat/chat.module').then((m) => m.ChatPageModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'client/tabs/home',
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
export class ClientTabsRoutingModule {}
