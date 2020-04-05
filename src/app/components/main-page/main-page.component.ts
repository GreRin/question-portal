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
	questions: Observable<any[]>;

	constructor(
		private router: Router,
		firestore: AngularFirestore
	) {
		this.users = firestore.collection('users').valueChanges();
		this.questions = firestore.collection('questions').snapshotChanges();
	}

  ngOnInit(): void {
		this.getDataFromDatabase()
	}

	getDataFromDatabase() {
		console.log(this.questions);
	}
	
	openMainPage() {
		this.router.navigate(['/']);
	}
}
