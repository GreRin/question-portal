import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../common/services/crud/crud.service';

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
  filterTerm: string;
  resolveComment: boolean

	constructor(
		public crudService: CrudService,
	) {
    this.resolveComment = this.crudService.resolveComment;
  }

  ngOnInit(): void {
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
			})
		})
	}

  deleteQuestion() {
    this.crudService.deleteQuestion(this.id);
  }

	tiledRowToggle() {
		this.tiled = !this.tiled;
		this.tiledToggle = this.tiled ? "col-sm-4 col-md-3 col-xl-2" : "col-sm-12 col-md-12 col-xl-12 card-row";
	}

	togglePipeActivation() {
    this.isActive = !this.isActive;
  }
}
