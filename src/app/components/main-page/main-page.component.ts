import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from '../../common/services/crud/crud.service';

import { QuestionData } from 'src/app/common/utils/question-data.model';

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
	questionData: QuestionData[];ъ
  isSort:boolean = false;

	constructor(
		public crudService: CrudService,
	) {}

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

	sortQuestion() {
	  this.isSort = !this.isSort;
  }

	filterBy(filter: string) {
	  switch(filter) {
      case 'Frontend': this.questionData = this.questionData.filter(question => {
        console.log(question.categories.includes('Frontend'))
      })
        break
    }
  }
}
