import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./sign-in/sign-in.module').then((m) => m.SignInPageModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/tabs/admin-tabs-routing.module').then(
        (m) => m.AdminTabsRoutingModule
      ),
  },
  {
    path: 'attendee',
    loadChildren: () =>
      import('./attendee/tabs/attendee-tabs-routing.module').then(
        (m) => m.AttendeeTabsRoutingModule
      ),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./client/tabs/client-tabs-routing.module').then(
        (m) => m.ClientTabsRoutingModule
      ),
  },
  {
    path: 'filter',
    loadChildren: () =>
      import('./client/filter/filter.module').then((m) => m.FilterPageModule),
  },
  {
    path: 'conform-reservation',
    loadChildren: () =>
      import('./client/conform-reservation/conform-reservation.module').then(
        (m) => m.ConformReservationPageModule
      ),
  },
  {
    path: 'create-event/:id',
    loadChildren: () =>
      import('./client/create-event/create-event.module').then(
        (m) => m.CreateEventPageModule
      ),
  },
  {
    path: 'event-details/:id/:url',
    loadChildren: () =>
      import('./attendee/event-details/event-details.module').then(
        (m) => m.EventDetailsPageModule
      ),
  },
  {
    path: 'request-details/:id',
    loadChildren: () =>
      import('./admin/request-details/request-details.module').then(
        (m) => m.RequestDetailsPageModule
      ),
  },

  {
    path: 'create-reservation',
    loadChildren: () =>
      import('./client/create-reservation/create-reservation.module').then(
        (m) => m.CreateReservationPageModule
      ),
  },
  {
    path: 'log-in',
    loadChildren: () =>
      import('./log-in/log-in.module').then((m) => m.LogInPageModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
  },
  {
    path: 'hall-info/:id',
    loadChildren: () =>
      import('./admin/hall-info/hall-info.module').then(
        (m) => m.HallInfoPageModule
      ),
  },
  {
    path: 'show-event-draft',
    loadChildren: () =>
      import('./show-event-draft/show-event-draft.module').then(
        (m) => m.ShowEventDraftPageModule
      ),
  },
  {
    path: 'my-details/:id',
    loadChildren: () =>
      import('./my-details/my-details.module').then(
        (m) => m.MyDetailsPageModule
      ),
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./chat/chat.module').then((m) => m.ChatPageModule),
  },
  {
    path: 'chat/:id',
    loadChildren: () =>
      import('./chat/chat.module').then((m) => m.ChatPageModule),
  },
  {
    path: 'view-reservations',
    loadChildren: () =>
      import('./view-reservations/view-reservations.module').then(
        (m) => m.ViewReservationsPageModule
      ),
  },
  {
    path: 'reservations-dates',
    loadChildren: () =>
      import('./reservations-dates/reservations-dates.module').then(
        (m) => m.ReservationsDatesPageModule
      ),
  },

  {
    path: 'ticket-details/:ticketID',
    loadChildren: () =>
      import('./attendee/ticket-details/ticket-details.module').then(
        (m) => m.TicketDetailsPageModule
      ),
  },
  // {
  //   path: 'chat',
  //   loadChildren: () => import('./client/chat/chat.module').then( m => m.ChatPageModule)
  // },
  // {
  //   path: 'halls',
  //   loadChildren: () => import('./client/halls/halls.module').then( m => m.HallsPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
