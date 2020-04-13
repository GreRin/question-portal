import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'src/app/common/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	toggleAddQuestionBtn: boolean = true;

  constructor(
		public afAuth: AngularFireAuth,
		public authService: AuthService,
	) { }

  ngOnInit(): void {
	}

	toggleSignInMode = () => {
		this.authService.signInMode = !this.authService.signInMode
	}

	showAddQuestionButton = () => {
		this.toggleAddQuestionBtn = true;
	}
	
	
	hideAddQuestionButton = () => {
		this.toggleAddQuestionBtn = false;
	}

	logout = () => {
		this.authService.logOut();
	}

	hideLoginButton = () => {
		if (this.afAuth.auth.currentUser) {
			return false
		} else { return true }
	}
}
