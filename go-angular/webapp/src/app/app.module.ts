import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon'; 
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CKEditorModule} from 'ckeditor4-angular';
import {LoginComponent } from './login/login.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
import { EditorComponent } from './editor/editor.component';
import { ArchiveComponent } from './archive/archive.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID

    //code to add other login methods
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // {
    //   scopes: [
    //     'public_profile',
    //     'email',
    //     'user_likes',
    //     'user_friends'
    //   ],
    //   customParameters: {
    //     'auth_type': 'reauthenticate'
    //   },
    //   provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    // },
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // {
    //   requireDisplayName: false,
    //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    // },
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  //credentialHelper: firebaseui.auth.CredentialHelper.NONE
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO

};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditorComponent,
    ArchiveComponent,
  ],
  imports: [
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    ReactiveFormsModule,
    CKEditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  providers: [
    [AngularFireAuth]
  ],
  bootstrap: [AppComponent]
  //should make the app land on the login page in the future
  //bootstrap: [LoginComponent]
  
  
})
export class AppModule {
}
