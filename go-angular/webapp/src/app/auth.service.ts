import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth, } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { firebaseui, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { getAuth, onAuthStateChanged } from 'firebase/firebase-auth';

// const auth = getAuth();
// onAuthStateChanged(getAuth(), (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    // //MAKE SURE THIS IS YOUR EMAIL
    // private myEmail = 'amusic2898@gmail.com';
    //public user = firebaseui.getInstance()
    // FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
    // public userName = "bro";
    // userData: Observable<firebase.User>;

    constructor(private afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) { }

    public user$: Observable<firebase.User> = this.afAuth.user.pipe(shareReplay(1));

    // signInWithEmail(email: string, password: string) {
    //     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    //         .then((res) => {
    //             console.log('AuthService::Successful Email login', res);
    //             return this.ngZone.run(() => this.router.navigate(['/']));
    //         });
    // }


    // signUpWithEmail(email: string, password: string) {
    //     return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    // }

    // amILoggedIn(): boolean {
    //     return this.afAuth.auth.currentUser && this.afAuth.auth.currentUser.email === this.myEmail;
    // }

    // logout() {
    //     this.afAuth.auth.signOut().then(
    //         this.router.navigate['/']
    //     );
    // }


}


