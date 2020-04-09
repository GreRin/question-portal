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

	userData: any;
	questionsList: any;
	user: Observable<User>;
 
  constructor(
		private firestore: AngularFirestore,
		private afAuth: AngularFireAuth,
	) { 
		// this.userData = this.afAuth.authState.subscribe(data => { data });
	 }
	
	addUser(value) {
    return this.firestore.collection('users').add({
			id: value.uid,
      email: value.email,
      password: value.password,
			name: value.displayName,
  	});
	}
 
  createNewQuestion(value) {
    return this.firestore.collection('newQuestion').add({
      title: value.title,
      text: value.text,
      java: value.java,
			salesforce: value.salesforce,
			frontend: value.frontend,
			currentDate: this.getDate(),
			user: {
				ownerId: "",
				displayName: "",
				email: "",
			}
  	});
	}

	getUserData() {
		// this.userData = this.afAuth.user.subscribe(data => { data.uid })
		this.afAuth.authState.subscribe(user => {
			if(user)
			this.userData = user.email;
		})
		console.log("This user data " + this.userData)
		// return this.userData
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
 