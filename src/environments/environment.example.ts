// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "@angular/fire/compat";
// import { getPerformance } from "firebase/performance"; // Removed, handled by AngularFire
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// 
// IMPORTANT: Copy this file to environment.ts and fill in your Firebase configuration values
// You can find these values in your Firebase Console under Project Settings > General > Your apps


export const environment = {
    production: false,
    firebase: {
        apiKey: "YOUR_API_KEY_HERE",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    }
};

// Remove direct initialization of app and perf. Let AngularFire handle it.
const app = initializeApp(environment.firebase);
export const db = getFirestore(app);
// If db is needed elsewhere, you may keep this, but ideally use AngularFire's injection.
// export const db = getFirestore(app)

