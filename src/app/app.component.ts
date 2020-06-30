import { Component, OnInit, NgZone } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { WindowService } from './common/services/window/window.service';
import { AuthService } from './common/services/auth/auth.service';

import { Router } from '@angular/router';

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
		private router: Router,
		private ngzone: NgZone
	) {}

  	ngOnInit() {
		this.windowRef = this.windowService.windowRef;
		this.authService.isAuth().subscribe(res => {
			if(res === true) {
				this.ngzone.run(() => this.router.navigate(['/main']));
			} else {
				this.ngzone.run(() => this.router.navigate(['/login']));
			}
		})
	}
}
