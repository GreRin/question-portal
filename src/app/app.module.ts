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

import { AuthRoutingModule } from './auth-routing-module';
import { HeaderComponent } from './components/header/header.component';

import { ColorPickerModule } from 'ngx-color-picker';
import { QuestionComponent } from './components/question/question.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { SortQuestionsPipe } from './common/services/pipes/sort-questions.pipe';
import { FilterCategoryPipe } from './common/services/pipes/filter-category.pipe';

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
    SortQuestionsPipe,
    FilterCategoryPipe
  ],
  imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebase),
		FormsModule,
		ReactiveFormsModule,
		AuthRoutingModule,
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
	],
  bootstrap: [AppComponent]
})
export class AppModule {
}
