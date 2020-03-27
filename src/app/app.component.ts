import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { WindowService } from './common/window/window.service';
import { AuthService } from './common/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

	phoneSignIn: boolean = true;
	windowRef: any;

	constructor (
		public afAuth: AngularFireAuth,
		public authService: AuthService,
		private windowService: WindowService
	) {}

  ngOnInit() {
		this.windowRef = this.windowService.windowRef;
	}
	
	toggleSignInMode() {
		this.authService.signInMode = !this.authService.signInMode
	}

	logout() {
		this.authService.logOut();
	}

	hideLoginButton() {
		if (this.afAuth.auth.currentUser) {
			return false
		} else { return true }
	}
}
