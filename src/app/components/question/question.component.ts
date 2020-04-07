import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { CrudService } from 'src/app/common/crud/crud.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
	id: number;
	title: string;
	questions: Observable<any[]>;

	constructor(
		private route: ActivatedRoute,
		public firestore: AngularFirestore,
		public crudService: CrudService,
	) {
		this.questions = firestore.collection('newQuestion').snapshotChanges();
	}

  ngOnInit(): void {
		this.id = +this.route.snapshot.params['id'];
		this.title = this.route.snapshot.params['title'];
		this.getDataFromDatabase()
	}

	getDataFromDatabase() {
		console.log(this.route.snapshot);
		// this.crudService.getQuestions()
		// .subscribe(result => {
		// 	console.log(result);
		// })
	}

}
