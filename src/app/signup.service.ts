import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, Observable} from 'rxjs';
import {Firestore, doc, setDoc, updateDoc, collection, query, where, getDocs} from '@angular/fire/firestore';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import { UserData } from './UserData';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private firestore: Firestore, 
    private fireAuth: AngularFireAuth, 
    private router: Router,
) {
}

    private userData: UserData = new UserData();
    username = this.userData.userName
    uid: any

    // Submit all the data to the backend
    async submitSignupData(username: string, firstName: string, lastName: string, email: string, password: string) {
      try {
        // Use the provided parameters, not the uninitialized this.userData fields
        const userCredential = await this.fireAuth.createUserWithEmailAndPassword(email, password);
        console.log('Signed up in authentication service!');

        if (!userCredential || !userCredential.user) {
          alert('Yikes! Something went wrong on our end. Give us a moment, and try again later! 🛠️');
          return Promise.reject('User creation failed');
        }

        this.uid = userCredential.user.uid;
        const userDocRef = doc(this.firestore, 'users', username);

        // Create the user document with all data (do not store plaintext password)
        await setDoc(userDocRef, {
          uid: (this.userData.uid = this.uid),
          firstName: (this.userData.firstName = firstName),
          lastName: (this.userData.lastName = lastName),
          userName: (this.userData.userName = username),
          email: (this.userData.email = email),
          joinedTime: (this.userData.joinedTime = new Date()),
        });
        console.log('Document created!');
        this.router.navigate(['/home']);
        return Promise.resolve();
      } catch (error: any) {
        if (error?.code === 'auth/email-already-in-use') {
          alert('Looks like this email is already in use.');
        } else if (error?.code === 'auth/invalid-email') {
          alert('The email address is invalid.');
        } else if (error?.code === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert('Uh-oh! something went wrong!');
          console.error(error);
        }
        throw error;
      }
    }
}
