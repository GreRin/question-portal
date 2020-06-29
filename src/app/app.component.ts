import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { WindowService } from './common/services/window/window.service';
import { AuthService } from './common/services/auth/auth.service';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

	windowRef: any;
	user: any;
	auth: boolean;

	constructor (
		public afAuth: AngularFireAuth,
		public authService: AuthService,
		private windowService: WindowService,
	) {}

  	ngOnInit() {
		this.windowRef = this.windowService.windowRef;
		this.isAuth();
	}

	isAuth() : Observable<firebase.User> {
		if(this.user !== null && this.user !== undefined) {
			return of(this.user)
		}
		const data = this.afAuth.authState;
		data.subscribe(res => {
			if(res) {
				return this.auth = true;
			} else {
				return this.auth = false;
			}
		})
	}
}
