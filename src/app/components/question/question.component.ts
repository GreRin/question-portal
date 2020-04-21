import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { CrudService } from 'src/app/common/services/crud/crud.service';

import { QuestionData } from '../../common/utils/question-data.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
	styleUrls: ['./question.component.css'],
	providers: [CrudService]
})
export class QuestionComponent implements OnInit {
	id: string;

	message: any;
	newComment: FormGroup;
	messageData: any;
	isComments = false;

	currentQuestion: QuestionData;

	constructor(
		private route: ActivatedRoute,
		public crudService: CrudService,
	) {}

  ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.id = params['id'];
			this.getDataFromDatabase();
		});
		this.createComment();
		// this.getComments();
	}

	getDataFromDatabase() {
		this.crudService.getQuestions()
		.subscribe(result => {
			this.currentQuestion = result.map(e => {
				console.log(this.id)
				return {
					id: e.payload.doc.id,
					...e.payload.doc.data() as QuestionData
				}
			}).find(e => {
				return e.id === this.id
			})
			console.log(this.currentQuestion)
		});
	}

	deleteQuestion() {
		console.log(this.id)
		this.crudService.deleteQuestion(this.id);
	}


	createComment() {
		this.newComment = new FormGroup({
			message: new FormControl()
		});
	}

	// getComments() {
	// 	return this.crudService.getComments(this.id)
	// 	.subscribe((result) => {
	// 		if(result.data().comments) {
	// 			this.messageData = result.data().comments;
	// 			console.log(this.messageData);
	// 		}
	// 	})
	// }

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
}
