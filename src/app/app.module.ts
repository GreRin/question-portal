import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { WindowService } from './common/window/window.service';
import { AuthService } from './common/auth/auth.service';

import { SigninSignupComponent } from './components/signup-login/signin-signup/signin-signup.component';
import { PhoneSigninComponent } from './components/signup-login/phone-signin/phone-signin.component';
import { UserDetailsComponent } from './components/user-profile/user-details.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';

import { AuthRoutingModule } from './auth-routing-module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninSignupComponent,
    PhoneSigninComponent,
    UserDetailsComponent,
    MainPageComponent,
    NewQuestionComponent,
    HeaderComponent
  ],
  imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebase),
		FormsModule,
		ReactiveFormsModule,
		AuthRoutingModule,
		AngularFirestoreModule
	],
	exports: [
		AngularFireModule,
		AngularFireAuthModule
	],
  providers: [
		AuthService,
		WindowService,
	],
  bootstrap: [AppComponent]
})
export class AppModule {
}
