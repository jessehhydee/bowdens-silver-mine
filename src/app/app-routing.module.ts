import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path:       '',
    redirectTo: 'home', 
    pathMatch:  'full' 
  },
  { 
    path:       "login",  
    component:  LoginComponent 
  },
  { 
    path:         "home",   
    component:    HomeComponent, 
    canActivate:  [
      AuthGuard
    ]  
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
