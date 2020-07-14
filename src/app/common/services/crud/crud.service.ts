import { Injectable } from '@angular/core';

import { AngularFirestore  } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { QuestionData } from '../../utils/question-data.model';
import { Comments } from '../../utils/comments';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

	id: string;
	email: string;
	name: string;
	avatar: string;
	comments: Comments[];
	editableQuestion: QuestionData;
	resolveComment: boolean;

  	constructor(
		private firestore: AngularFirestore,
		private afAuth: AngularFireAuth,
	) {
		this.id = this.afAuth.auth.currentUser.uid;
		this.name = this.afAuth.auth.currentUser.displayName;
		this.email = this.afAuth.auth.currentUser.email;
		this.avatar = this.afAuth.auth.currentUser.photoURL;
	 }

  	createNewQuestion(value) {
    	return this.firestore.collection('newQuestion').add(value);
	}

	getQuestions() {
    	return this.firestore.collection('newQuestion').snapshotChanges();
	}

	updateQuestion(editableQuestion) {
		this.firestore.doc(`newQuestion/${editableQuestion.id}`).update(editableQuestion);
	}

	deleteQuestion(questionId) {
		this.firestore.collection('newQuestion').doc(questionId).delete();
	}

	getDate() {
		const timestamp = (+new Date());
    	return timestamp;
	}

	addComment(id, value) {
		return this.firestore.collection('newQuestion').doc(id).update({
			comments: value
		});
	}
}
