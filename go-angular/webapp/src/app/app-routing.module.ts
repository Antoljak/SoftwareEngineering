import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ArchiveComponent } from './archive/archive.component';
import { LoginComponent } from './login/login.component';
import { redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { canActivate } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInTo(['editor'])) },
  { path: 'editor', component: EditorComponent, ...canActivate(redirectUnauthorizedTo(['login'])) },
  { path: 'editor/:title', component: EditorComponent, ...canActivate(redirectUnauthorizedTo(['login'])) },
  { path: 'archive', component: ArchiveComponent, ...canActivate(redirectUnauthorizedTo(['login'])) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 
})
export class AppRoutingModule { }