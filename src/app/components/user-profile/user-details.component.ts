import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {

  constructor(
		public afAuth: AngularFireAuth,
		private router: Router
	) { }

  ngOnInit(): void {
	}
	
	openUserProfile() {
		this.router.navigate(['/user-profile']);
	}
}
