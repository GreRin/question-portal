import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppFirebaseModule } from './app-firebase/app-firebase.module';

import { WindowService } from './common/window/window.service';
import { AuthService } from './common/auth/auth.service';
import { LoginOptionsComponent } from './components/login-options/login-options.component';
import { SigninSignupComponent } from './components/signin-signup/signin-signup.component';
import { PhoneSigninComponent } from './components/phone-signin/phone-signin.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginOptionsComponent,
    SigninSignupComponent,
    PhoneSigninComponent,
    UserDetailsComponent
  ],
  imports: [
		BrowserModule,
		AppFirebaseModule,
		FormsModule,
		ReactiveFormsModule
  ],
  providers: [
		AuthService,
		WindowService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
