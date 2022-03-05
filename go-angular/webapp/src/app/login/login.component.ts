import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private afAuth: AngularFireAuth, public router: Router, private route: ActivatedRoute) {
    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
    
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(d => console.log(d));
  }

  firebaseAuthChangeListener(response) {
    () => {
      if (response) {
        console.log('Logged in :)');
        //DOES NOT WORK AND I DONT KNOW WHY
        this.router.navigate(['editor']);
      } else {
        console.log('Logged out :(');
      }
    }
    // if needed, do a redirect in here
  };

  logout() {
    //this.afAuth.signOut();
  }

  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    console.log('successCallback', data);
    this.router.navigate(['editor']);
  }

  errorCallback(data: FirebaseUISignInFailure) {
    console.warn('errorCallback', data);
  }

}
