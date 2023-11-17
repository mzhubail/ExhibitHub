import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'attendee/tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('../events/events.module').then((m) => m.EventsPageModule),
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('../tickets/tickets.module').then((m) => m.TicketsPageModule),
      },
      {
        path: 'more',
        loadChildren: () =>
          import('../more/more.module').then((m) => m.MorePageModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'attendee/tabs/home',
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
export class AttendeeTabsRoutingModule {}
