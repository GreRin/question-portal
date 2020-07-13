import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import { CrudService } from 'src/app/common/services/crud/crud.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';

import { QuestionData } from '../../common/utils/question-data.model';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

	id: string;
	message: any;
	newComment: FormGroup;
	currentQuestion: QuestionData;
	openEditModal: boolean;
	admin: boolean;
	author: boolean;
	userEmail: string;
	questionData: QuestionData;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public crudService: CrudService,
		public authService: AuthService
	) {
		this.userEmail = this.authService.email;
		this.author = false;
	}

  	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.id = params['id'];
			this.getDataFromDatabase();
		});

		this.authService.isAdmin().subscribe(
			(data: any) => {
				this.admin = this.authService.admin;
			},
			error => console.error('error:', error)
		);
		
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
			});
			if(this.currentQuestion.user.email === this.authService.email || 
			    this.currentQuestion.user.ownerId === this.authService.userId) {
					this.author = true;
			}
		});
	}

	editQuestion() {
	  	this.openEditModal = true;
		this.crudService.editableQuestion = this.currentQuestion;
	}

	deleteQuestion() {
		this.crudService.deleteQuestion(this.id);
		this.router.navigate(['/main']);
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

    	this.currentQuestion.comments.push(
		{
			message: value.message,
			currentDate: this.crudService.getDate(),
			resolveComment: false,
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

  	resComment(event: any, i: number) {
		this.currentQuestion.comments.map( (data, index) => {
			if(index === i) {
				data.resolveComment = event.target.checked;
				this.crudService.resolveComment = event.target.checked;
			}
		})

		this.crudService.addComment(this.id, this.currentQuestion.comments)
	}
	  
	approveQuestion() {
		this.questionData = {
			id: this.id,
            approved: true,
            currentDate: this.crudService.getDate()
        }

        this.crudService.updateQuestion(this.questionData);
	}
}
