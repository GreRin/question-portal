import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { CrudService } from '../../common/crud/crud.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import '@firebase/firestore'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

	// questions: AngularFireList<any[]>;
	// text: Array<any>;
	// java: Array<any>;
	// salesforce: Array<any>;
	// frontend: Array<any>;
	users: Observable<any[]>;
	questions: Observable<any[]>;

	constructor(
		private router: Router,
		public firestore: AngularFirestore,
		public crudService: CrudService,
	) {
		this.users = firestore.collection('users').valueChanges();
		this.questions = firestore.collection('newQuestion').snapshotChanges();
	}

  ngOnInit(): void {
		this.getDataFromDatabase()
	}

	getDataFromDatabase() {
		console.log(this.questions);
		this.crudService.getQuestions()
		.subscribe(result => {
			console.log(result);
		})
	}
	
	openMainPage() {
		this.router.navigate(['/']);
	}
}
