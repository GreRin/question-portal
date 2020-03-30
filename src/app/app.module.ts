import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppFirebaseModule } from './app-firebase/app-firebase.module';

import { WindowService } from './common/window/window.service';
import { AuthService } from './common/auth/auth.service';

import { LoginOptionsComponent } from './components/login-options/login-options.component';
import { SigninSignupComponent } from './components/signin-signup/signin-signup.component';
import { PhoneSigninComponent } from './components/phone-signin/phone-signin.component';
import { UserDetailsComponent } from './components/user-profile/user-details.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';

import { AuthRoutingModule } from './auth-routing-module';

@NgModule({
  declarations: [
    AppComponent,
    LoginOptionsComponent,
    SigninSignupComponent,
    PhoneSigninComponent,
    UserDetailsComponent,
    MainPageComponent,
    NewQuestionComponent
  ],
  imports: [
		BrowserModule,
		AppFirebaseModule,
		FormsModule,
		ReactiveFormsModule,
		AuthRoutingModule,
  ],
  providers: [
		AuthService,
		WindowService,
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
