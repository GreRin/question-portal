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

	id;
	color = '#f5f5f5';
	tiled = true;
	tiledToggle;
	row = "col-xl-12";

	questionData: QuestionData[];

	constructor(
		private router: Router,
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

	deleteDataFromDatabase() {
		console.log("Deleted");
	}

	tiledRowToggle() {
		this.tiled = !this.tiled;
		this.tiledToggle = this.tiled ? "col-sm-4 col-md-3 col-xl-2" : "col-sm-12 col-md-12 col-xl-12 card-row";
	}

	openMainPage() {
		this.router.navigate(['/']);
	}
}
