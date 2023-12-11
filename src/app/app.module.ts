import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
<<<<<<< HEAD
import { provideAuth, getAuth } from '@angular/fire/auth';



// Put the shared configuration here
const firebaseConfig = {
  apiKey: "AIzaSyAewP-f5oF_JBINba9o0gG9_v5vJl1jk6Q",
  authDomain: "itcs444-project-c11e9.firebaseapp.com",
  projectId: "itcs444-project-c11e9",
  storageBucket: "itcs444-project-c11e9.appspot.com",
  messagingSenderId: "995661247132",
  appId: "1:995661247132:web:f0b8449b615d3e71e8b359"
};


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()) 
=======
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
>>>>>>> afafd6fe32da40ae2b28ae5f40ab2ed113321a53
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
