import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
// import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
	// users: FirebaseListObservable<any[]>;
	constructor(
		public auth: AuthService,
		public db: AngularFireDatabase) {}
	
	ngOnInit() {
		// this.auth.getAuthState().subscribe(
		// 	(user) => this.users = user);    
		// this.users = this.db.list('/users');
		// console.log(this.users);
	}
}
