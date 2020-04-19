import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';

import { CrudService } from 'src/app/common/services/crud/crud.service';

import { QuestionData } from '../../common/utils/question-data.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
	id;
	title: string;
	text: string;
	currentDate: string;
	java: boolean;
	salesforce: boolean;
	frontend: boolean;
	author: string;

	message: any;
	newComment: FormGroup;
	messageData: any;
	isComments = false;

	currentQuestion: QuestionData[];

	constructor(
		private route: ActivatedRoute,
		public crudService: CrudService,
	) {}

  ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.id = params['id'];
		});
		this.title = this.route.snapshot.queryParams['title'];
		this.text = this.route.snapshot.queryParams['text'];
		this.currentDate = this.route.snapshot.queryParams['currentDate'];
		this.java = this.route.snapshot.queryParams['java'];
		this.salesforce = this.route.snapshot.queryParams['salesforce'];
		this.frontend = this.route.snapshot.queryParams['frontend'];
		this.author = this.route.snapshot.queryParams['author'];

		this.createComment();
		this.getComments();
	}


	createComment() {
		this.newComment = new FormGroup({
			message: new FormControl()
		});
	}

	getComments() {
		return this.crudService.getComments(this.id)
		.subscribe((result) => {
			if(result.data().comments) {
				this.isComments = true;
				this.messageData = result.data().comments;
				console.log(this.messageData);
			}
		})
	}

	onSubmit(value) {
    if(!this.newComment.value) {
      return false;
		}
		console.log(this.id);
		this.crudService.addComment(this.id, value)
		.then(
			res => {
				this.newComment.reset()
			}
		)
	}

	// getDataFromDatabase() {
	// 	this.crudService.getQuestions()
	// 	.subscribe(result => {
	// 		this.currentQuestion = result.map(e => {
	// 			console.log(this.id)
	// 			console.log(e)
	// 			return {
	// 				...e.payload.doc.data() as QuestionData
	// 			}
	// 		})
	// 	})
	// }
}
