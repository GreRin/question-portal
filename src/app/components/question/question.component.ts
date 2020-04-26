import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

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
		private router: Router,
		private route: ActivatedRoute,
		public crudService: CrudService,
	) {}

  ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.id = params['id'];
			this.getDataFromDatabase();
		});
		this.createComment();
	}

	getDataFromDatabase() {
		this.crudService.getQuestions()
		.subscribe(result => {
			this.currentQuestion = result.map(e => {
				return {
					id: e.payload.doc.id,
					...e.payload.doc.data() as QuestionData
				}
			}).find(e => {
				return e.id === this.id
			})
			// console.log(this.currentQuestion)
		});
	}

	editQuestion() {
		this.crudService.editQuestion(this.id)
		// console.log(this.crudService.editQuestion(this.id))
	}

	deleteQuestion() {
		this.crudService.deleteQuestion(this.id);
		this.router.navigate(['/'])
      .then(
        res => {
          this.router.navigate(['/ErrorPage']);
        }
      )
	}

	createComment() {
		this.newComment = new FormGroup({
			message: new FormControl("",[Validators.required, Validators.minLength(1)])
		});
	}

	onSubmit(value) {
    if(!this.newComment.value) {
      return false;
		}

    this.currentQuestion.comments.push({
      message: value.message,
      currentDate: this.crudService.getDate(),
      user: {
        ownerId: this.crudService.id,
        displayName: this.crudService.name,
        email: this.crudService.email,
        avatar: this.crudService.avatar
      }
    })

    this.crudService.addComment(this.id, this.currentQuestion.comments)
      .then(
        res => {
          this.newComment.reset()
        }
      )
  }
}
