import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing-module';
import { HeaderComponent } from '../system/header/header.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		HeaderComponent,
		LoginComponent,
		RegistrationComponent,
		AuthComponent,
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		FormsModule
	]
})

export class AuthModule {}