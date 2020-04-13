import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';

import { CrudService } from 'src/app/common/services/crud/crud.service';

import { QuestionData } from '../../common/utils/question-data.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
	id: number;
	title: string;
	questions;

	questionData: QuestionData[];

	constructor(
		private route: ActivatedRoute,
		public firestore: AngularFirestore,
		public crudService: CrudService,
	) {}

  ngOnInit(): void {
		this.id = +this.route.snapshot.params['id'];
		this.title = this.route.snapshot.params['title'];
		this.getDataFromDatabase()
	}

	getDataFromDatabase = () => {
		// console.log(this.route.snapshot);
		this.crudService.getQuestions()
		.subscribe(result => {
			this.questions = result.map(e => {
				return {
					id: e.payload.doc.id,
					title: e.payload.doc.data()
				} as QuestionData
			})
		})
	}

}
