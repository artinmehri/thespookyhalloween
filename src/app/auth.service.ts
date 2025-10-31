import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user$: Observable<firebase.User | null>;
  
    constructor(private fireAuth: AngularFireAuth, private router: Router) {
      this.user$ = this.fireAuth.authState;
    }

    async login(email: string, password: string, returnUrl: string = '/') {
        try {
            const userCredential = await this.fireAuth.signInWithEmailAndPassword(email, password)
            const user = userCredential.user
            if (user) {
                user.getIdToken().then(token => {
                    this.router.navigate(['/home'], { queryParams: { returnUrl } });
                })
            }
        } catch (error: any) {
            alert('Incorrect login. Are you even real, or just a glitch in the Matrix?');
        }
    }


    logout() {
        this.fireAuth.signOut().then(() => {
            setTimeout(() => this.router.navigate(['/home']), 2000
            )
        }, err => {
            alert(err.message)
        })
    }

    forgotPassword(email: string) {
        return this.fireAuth.sendPasswordResetEmail(email)
    }

    newPassword(actionCode: string, newPassword: string) {
        try {
            if (!actionCode) {
                console.error('NO Action code provided')
            } else {
                this.fireAuth.confirmPasswordReset(actionCode, newPassword).then(() => {
                    this.router.navigate(['/login/password/confirmation']).catch(error => {
                        alert('Password reset failed!')
                        if (error === 'auth/invalid-action-code') {
                            throw new Error('This password reset link has been expired.')
                        }
                    })
                })
            }
        } catch (error: any) {
            alert('An error occurred while resetting password, please try again laterrrr!')
        }
    }
}
