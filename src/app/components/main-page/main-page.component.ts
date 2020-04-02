import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import '@firebase/firestore'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

	users: Observable<any[]>;

	constructor(
		private router: Router,
		firestore: AngularFirestore
	) {
		this.users = firestore.collection('users').valueChanges();
	}

  ngOnInit(): void {
	}
	
	openMainPage() {
		this.router.navigate(['/']);
	}
}
