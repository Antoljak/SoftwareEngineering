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
    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener.bind(this));
  }

  ngOnInit(): void {
    //prints current auth state info
    this.afAuth.authState.subscribe(d => console.log(d));
  }

  //listens for change in logged in state
  private firebaseAuthChangeListener(response) {
    //if logged in, print message and route to editor page
    if (response) {
      console.log('Logged in :)');
      this.router.navigate(['editor']);
    } else {
      console.log('Logged out :(');
    } 
  }

  

  

}
