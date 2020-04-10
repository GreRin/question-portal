import { Injectable } from '@angular/core';
 
import { AngularFirestore  } from '@angular/fire/firestore';

import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';

interface User { 
	uid: string; 
	email: string; 
	photoURL?: string; 
	displayName?: string; 
}
 
@Injectable({
  providedIn: 'root'
})

export class CrudService {

	id: string;
	email: string;
	name: string;
	questionsList: any;
	user: Observable<User>;
 
  constructor(
		private firestore: AngularFirestore,
		private afAuth: AngularFireAuth,
	) { 
		this.id = this.afAuth.auth.currentUser.uid;
		this.name = this.afAuth.auth.currentUser.displayName;
		this.email = this.afAuth.auth.currentUser.email;
	 }
	
	addUser() {
    return this.firestore.collection('users').add({
			ownerId: this.id,
			displayName: this.name,
			email: this.email,
  	});
	}
 
  createNewQuestion(value) {
    return this.firestore.collection('newQuestion').add({
      title: value.title,
      text: value.text,
      java: value.java,
			salesforce: value.salesforce,
			frontend: value.frontend,
			// category: value.category,
			currentDate: this.getDate(),
			user: {
				ownerId: this.id,
				displayName: this.name,
				email: this.email,
			}
  	});
	}

	getUserData() {
		// console.log(this.afAuth.auth.currentUser)
	}

	getDate() {
		const timestamp = new Date();
    const time = `${timestamp.getDate()}.${timestamp.getMonth()}.${timestamp.getFullYear()}`;
    return time;
	}

	getQuestions() {
    return this.firestore.collection('newQuestion').valueChanges();
  }
}
 