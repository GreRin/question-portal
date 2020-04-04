import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})

export class CrudService {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 
  createNewQuestion(value) {
    return this.firestore.collection('newQuestion').add({
      title: value.title,
      text: value.text,
      java: value.java,
			salesforce: value.salesforce,
			frontend: value.frontend
  	});
	}
}
 