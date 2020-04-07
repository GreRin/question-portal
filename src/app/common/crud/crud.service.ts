import { Injectable } from '@angular/core';
 
import { AngularFirestore  } from '@angular/fire/firestore';

import { AngularFireAuth } from 'angularfire2/auth';
 
@Injectable({
  providedIn: 'root'
})

export class CrudService {
	user: {
		ownerId: '',
		displayName: '',
		email: '',
	}

	userData: any;
	questionsList: any;
 
  constructor(
		private firestore: AngularFirestore,
		private afAuth: AngularFireAuth,
	) { 
		this.userData = this.afAuth.user.subscribe(data => { data.uid })
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
		this.userData = this.afAuth.user.subscribe(data => { data.uid })
		console.log(this.userData)
		return this.userData
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
 