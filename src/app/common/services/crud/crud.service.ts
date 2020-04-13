import { Injectable } from '@angular/core';
 
import { AngularFirestore  } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { QuestionData } from '../../utils/question-data.model';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

	id: string;
	email: string;
	name: string;
	questionsList: any;
 
  constructor(
		private firestore: AngularFirestore,
		private afAuth: AngularFireAuth,
	) { 
		this.id = this.afAuth.auth.currentUser.uid;
		this.name = this.afAuth.auth.currentUser.displayName;
		this.email = this.afAuth.auth.currentUser.email;
	 }

 
  createNewQuestion = (value) => {
		console.log(value);
    return this.firestore.collection('newQuestion').add({
      title: value.title,
      text: value.text,
      java: value.categories[0],
			salesforce: value.categories[1],
			frontend: value.categories[2],
			currentDate: this.getDate(),
			user: {
				ownerId: this.id,
				displayName: this.name,
				email: this.email,
			}
  	});
	}

	getQuestions = () => {
    return this.firestore.collection('newQuestion').snapshotChanges();
	}

	createQuestion = (question: QuestionData) => {
    return this.firestore.collection('newQuestion').add(question);
	}

	updateQuestion = (question: QuestionData) => {
    delete question.id;
    this.firestore.doc('newQuestion/' + question.id).update(question);
	}
	
	deleteQuestions = (policyId: string) => {
		this.firestore.doc('newQuestion/' + policyId).delete();
	}
	
	getDate = () => {
		const timestamp = new Date();
    const time = `${timestamp.getDate()}.${timestamp.getMonth()}.${timestamp.getFullYear()}`;
    return time;
	}
}
 