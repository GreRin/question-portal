import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../common/services/crud/crud.service';
import { AuthService } from '../../common/services/auth/auth.service';

import { QuestionData } from 'src/app/common/utils/question-data.model';

import {  } from '../question/question.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

	id: string;
	color = '#f5f5f5';
	tiled: boolean = true;
	tiledToggle: string;
	questionData: QuestionData[];
	isActive:boolean = false;
	isAnswerActive:string;
	isTimePipeActive:string;
	filterTerm: string;
	resolveComment: boolean;
	admin: boolean;
	approvedQuestion: boolean;
	filterModeration: boolean;
	filterMyQuestions: boolean;
	unfilterQuestions: boolean;
	userId: string;
	email: string;

	constructor(
		public crudService: CrudService,
		public authService: AuthService,
	) {
    this.resolveComment = this.crudService.resolveComment;
  }

  ngOnInit(): void {
	  	this.authService.isAdmin().subscribe(
			(data: any) => {
				this.admin = this.authService.admin;
				this.getDataFromDatabase()
			},
			error => console.error('error:', error)
		);

		this.authService.isAuth().subscribe(
			(data: any) => {
				this.userId = this.authService.userId;
				this.email = this.authService.email;
			},
			error => console.error('error:', error)
		);
	}

	getDataFromDatabase() {
		this.crudService.getQuestions()
		.subscribe(result => {
			this.questionData = result.map(item => {
				return {
					id: item.payload.doc.id,
					...item.payload.doc.data() as QuestionData
				}
			}),
         	error => { error.message; console.log("Something wrong with data!" + error) };
		})
	}

	tiledRowToggle() {
		this.tiled = !this.tiled;
		this.tiledToggle = this.tiled ? "col-sm-4 col-md-4 col-xl-2" : "col-sm-10 col-md-10 col-xl-10 card-row";
	}

	togglePipeActivation() {
		this.isActive = !this.isActive;
	}

	togglePipeAnswered($event) {
		this.isAnswerActive = $event.target.value;
	}

	togglePipeTime($event) {
		this.isTimePipeActive = $event.target.value;
	}

	onModeration($event) {
		if($event.target.value === "userQuestions") {
			this.filterModeration = true;
			this.filterMyQuestions = false;
			this.unfilterQuestions = false
		} else if ($event.target.value === "onModeration") {
			this.filterModeration = false;
			this.filterMyQuestions = true;
			this.unfilterQuestions = false
		} else if ($event.target.value === "all") {
			this.filterModeration = false;
			this.filterMyQuestions = false;
			this.unfilterQuestions = true
		}	
	}

	// userQuestions($event) {
	// 	this.filterMyQuestions = $event.target.value;
	// }

	// unFilter($event) {
	// 	this.unfilterQuestions = $event.target.value;
	// }
}
