import { Injectable } from '@angular/core';
 
import { AngularFirestore  } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})

export class CrudService {
	questionsList: any;
 
  constructor(
    private firestore: AngularFirestore
	) { }
	
	addUser(value) {
    return this.firestore.collection('users').add({
			id: value.id,
      email: value.email,
      password: value.password,
			name: value.name,
  	});
	}
 
  createNewQuestion(value) {
    return this.firestore.collection('newQuestion').add({
      title: value.title,
      text: value.text,
      java: value.java,
			salesforce: value.salesforce,
			frontend: value.frontend
  	});
	}

	getQuestions() {
    return this.firestore.collection('newQuestion').valueChanges();
  }
}
 