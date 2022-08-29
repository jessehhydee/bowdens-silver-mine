import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ComponentsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
