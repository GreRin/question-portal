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
	tiled = true;
	tiledToggle: string;
	questionData: QuestionData[];
	isActive:boolean = false;
	isAnswerActive:string;
	isTimePipeActive:string;
	filterTerm: string;
	resolveComment: boolean;
	admin: boolean;

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
			},
			error => console.error('error:', error)
		);
		this.getDataFromDatabase()
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
		this.tiledToggle = this.tiled ? "col-sm-4 col-md-3 col-xl-2" : "col-sm-12 col-md-12 col-xl-12 card-row";
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
}
