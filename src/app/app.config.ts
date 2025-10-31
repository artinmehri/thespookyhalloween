import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {getAuth} from "firebase/auth";  
import { provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { providePerformance, getPerformance } from '@angular/fire/performance';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),  // <-- Add this line to provide HttpClient globally
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase},
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    providePerformance(() => getPerformance()),
  ],
};
