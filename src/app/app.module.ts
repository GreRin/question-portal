import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule  } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    HomePageComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase, 'letslearn-dev'),
		AngularFireDatabaseModule,
		AngularFireAuthModule
  ],
  providers: [AuthService],
	bootstrap: [AppComponent]
})
export class AppModule { }
