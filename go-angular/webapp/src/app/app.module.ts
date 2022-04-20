import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/";
import { MatSelectModule } from "@angular/material/";
import {MatProgressBarModule} from '@angular/material/progress-bar'; 

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CKEditorModule } from 'ckeditor4-angular';
import { LoginComponent } from './login/login.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { EditorComponent } from './editor/editor.component';
import { DialogComponent } from './editor/editor.component';
import { ArchiveComponent } from './archive/archive.component';
import { DeleteDialogComponent } from './archive/archive.component';
import { NoteService } from './service/note.service';
import { RouterModule } from '@angular/router';
import { AngularFireAuthGuard, AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule
import { FlexLayoutModule } from '@angular/flex-layout';


const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID

    //code to add other login methods goes here
    
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO

};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditorComponent,
    ArchiveComponent,
    DialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    ReactiveFormsModule,
    CKEditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [
    [AngularFireAuth, AngularFireAuthGuard, NoteService]
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, DeleteDialogComponent]

})
export class AppModule {
}
