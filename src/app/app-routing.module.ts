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
    redirectTo: 'home',
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
