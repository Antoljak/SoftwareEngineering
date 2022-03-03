import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    // //MAKE SURE THIS IS YOUR EMAIL
    // private myEmail = 'amusic2898@gmail.com';

    // //public user$: Observable<firebase.User> = this.afAuth.user.pipe(shareReplay(1));
  
    // constructor(private afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) { }

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