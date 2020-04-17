import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { CrudService } from 'src/app/common/services/crud/crud.service';

import { QuestionData } from '../../common/utils/question-data.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
	
	id;
	isLoaded = false;
	currentQuestion: QuestionData[];

	constructor(
		public firestore: AngularFirestore,
		public crudService: CrudService,
	) {}

  ngOnInit(): void {
		this.getDataFromDatabase();
		this.isLoadedData();
	}

	getDataFromDatabase() {
		// console.log(this.route.snapshot);
		this.crudService.getQuestions()
		.subscribe(result => {
			this.currentQuestion = result.map(e => {
				return {
					id: e.payload.doc.id,
					...e.payload.doc.data(this.id) as QuestionData
				}
			})
		})
	}

	isLoadedData() {
		if(this.currentQuestion) {
			this.isLoaded = true;
		}
	}
}
