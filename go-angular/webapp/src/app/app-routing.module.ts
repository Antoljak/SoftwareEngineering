import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ArchiveComponent } from './archive/archive.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
//import { canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToNoteEditor = () => redirectLoggedInTo(['/editor']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToNoteEditor } },
  { path: 'editor', component: EditorComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  // { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInTo(['/editor'])) },
  // { path: 'editor', component: EditorComponent, ...canActivate(redirectUnauthorizedTo(['/login'])) },
  { path: 'archive', component: ArchiveComponent },
  //{ path: '', redirectTo: 'login' },
  //{ path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 
})
export class AppRoutingModule { }