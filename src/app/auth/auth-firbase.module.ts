import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [],
  imports: [
		AngularFireModule.initializeApp(environment.firebase)
	],
	exports: [
		AngularFireModule,
		AngularFireAuthModule
	]
})
export class AppFirebaseModule { }