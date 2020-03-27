import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../services/auth.service';
import { AppFirebaseModule } from '../auth/auth-firbase.module';

import { AppRoutingModule } from './app-routing.module';

import { HomePageComponent } from './home-page/home-page.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		AppFirebaseModule,
		AuthModule
  ],
  providers: [AuthService],
	bootstrap: [AppComponent]
})
export class AppModule { }
