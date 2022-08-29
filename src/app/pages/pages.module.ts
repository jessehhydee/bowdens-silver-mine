import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ComponentsModule
  ],
  exports: [
    LoginComponent,
    HomeComponent
  ],
  entryComponents: [],
  providers: []
})
export class PagesModule {}