import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/common/services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { constants } from '../../../common/utils/constants';

@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.css']
})

export class SigninSignupComponent implements OnInit {

	email: string;
	password: string;
	form: FormGroup;
	providers = constants.providers;
	modes = constants.modes;

	constructor(
		public authService: AuthService,
	) {}

  	ngOnInit(): void {
		this.form = new FormGroup({
			mail: new FormControl("", [Validators.required, Validators.email]),
			pass: new FormControl("", [Validators.required, Validators.minLength(6)])
		})
	}

	signInOrSignUp() {
		this.authService.signInOrSignUp(this.email, this.password)
	}

	signInWithModeAndProvider(mode: string, provider: string) {
		this.authService.signIn(mode, provider);
	}

	togglePhoneSignIn() {
		this.authService.phoneSignIn = !this.authService.phoneSignIn
	}

	checkForEmail(control: FormControl) : Promise<any> {
		return new Promise((resolve, reject) => {
			if(control.value === 'rigor88@mail.ru') {
				resolve({
					'emailIsUsed': true
				})
			} else {
				resolve(null);
			}
		})
	}
}
