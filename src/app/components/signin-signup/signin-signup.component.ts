import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/common/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.css']
})
export class SigninSignupComponent implements OnInit {

	email: string;
	password: string;
	form: FormGroup;

	constructor(
		public authService: AuthService,
		private afAuth: AngularFireAuth
	) {}

  ngOnInit(): void {
		this.form = new FormGroup({
			mail: new FormControl("", [Validators.required, Validators.email]),
			pass: new FormControl("", [Validators.required, Validators.minLength(6)])
		})
	}
	
	signInOrSignUp() {
		this.authService.signInOrSignUp(this.email, this.password);
		console.log(this.form);
	}

	checkForLength(control: FormControl) {
		if (control.value.length <= 5) {
			return {
				'lengthError': true
			}
		}
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
