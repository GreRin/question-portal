import { Component, OnInit } from '@angular/core';

// import { AngularFirestore } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import 'firebase/firestore';

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
	toggleAddQuestionBtn: boolean = true;

	constructor (
		public afAuth: AngularFireAuth,
		public authService: AuthService,
		private windowService: WindowService,
	) {}

  ngOnInit() {
		this.windowRef = this.windowService.windowRef;
	}
	
	toggleSignInMode() {
		this.authService.signInMode = !this.authService.signInMode
	}

	showAddQuestionButton() {
		this.toggleAddQuestionBtn = true;
	}

	hideAddQuestionButton() {
		this.toggleAddQuestionBtn = false;
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
