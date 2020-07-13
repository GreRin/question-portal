import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { WindowService } from './common/services/window/window.service';
import { AuthService } from './common/services/auth/auth.service';

import { SigninSignupComponent } from './components/signup-login/signin-signup/signin-signup.component';
import { PhoneSigninComponent } from './components/signup-login/phone-signin/phone-signin.component';
import { UserDetailsComponent } from './components/user-profile/user-details.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';

import { AppRoutingModule } from './app-routing-module';
import { HeaderComponent } from './components/header/header.component';

import { ColorPickerModule } from 'ngx-color-picker';
import { QuestionComponent } from './components/question/question.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { SortDataPipe } from './common/pipes/sort-data.pipe';
import { FilterDataPipe } from './common/pipes/filter-data.pipe';
import { AnsweredPipe } from './common/pipes/answered.pipe';
import { TimeDurationPipe } from './common/pipes/time-duration.pipe';
import { AuthGuard } from './common/services/auth/auth.guard';
import { ApprovedPipe } from './common/pipes/approved.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SigninSignupComponent,
    PhoneSigninComponent,
    UserDetailsComponent,
    MainPageComponent,
    NewQuestionComponent,
    HeaderComponent,
    QuestionComponent,
    NotFoundComponent,
    EditQuestionComponent,
    SortDataPipe,
    FilterDataPipe,
    AnsweredPipe,
    TimeDurationPipe,
    ApprovedPipe,
  ],
  imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebase),
		FormsModule,
		ReactiveFormsModule,
    AppRoutingModule,
		AngularFirestoreModule,
		ColorPickerModule
	],
	exports: [
		AngularFireModule,
		AngularFireAuthModule
	],
  providers: [
		AuthService,
    WindowService,
    AuthGuard,
	],
  bootstrap: [AppComponent]
})
export class AppModule {
}
