import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { WindowService } from './common/services/window/window.service';
import { AuthService } from './common/services/auth/auth.service';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

	windowRef: any;
	user: any;
	auth: any;

	constructor (
		public afAuth: AngularFireAuth,
		public authService: AuthService,
		private windowService: WindowService,
	) {}

  	ngOnInit() {
		this.windowRef = this.windowService.windowRef;
		this.isAuth();
	}

	isAuth() {
		this.afAuth.authState.subscribe(res => {
			if(res && res.uid) {
				return this.auth = true;
			} else {
				this.afAuth.auth.signOut();
			}
		})
	}
}
