import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing-module';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../shared/shared.module';

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
		SharedModule
	]
})

export class AuthModule {}