import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
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
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
