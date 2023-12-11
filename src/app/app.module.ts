import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDNmt_nu3M_jm_NRgdyefHVUBfgregqEZk',
  authDomain: 'exhibithub-a4e6d.firebaseapp.com',
  projectId: 'exhibithub-a4e6d',
  storageBucket: 'exhibithub-a4e6d.appspot.com',
  messagingSenderId: '223295534006',
  appId: '1:223295534006:web:2f70853d84b7b334b44717',
  measurementId: 'G-LK07BHYSFB',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // initialize angularfire with credentials from the dashboard
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // Import the AngularFireDatabaseModule to use database
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
