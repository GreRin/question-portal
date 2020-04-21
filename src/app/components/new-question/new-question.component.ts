import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { CrudService } from '../../common/services/crud/crud.service';

import { mycategory } from '../../common/utils/category';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
	styleUrls: ['./new-question.component.css'],
	providers: [CrudService]
})
export class NewQuestionComponent implements OnInit {

  mycat = mycategory;

	title: any;
	text: any;
	isSubmitted = false;
	selectedCategoryNames: string[];
	newQuestionForm: FormGroup;

  constructor(
		private router: Router,
		private crudService: CrudService,
	) {}

  ngOnInit(): void {
		this.createNewQuestion()
	}

	createNewQuestion() {
		this.newQuestionForm = new FormGroup({
			title: new FormControl("", [Validators.required]),
			text: new FormControl("", [Validators.required]),
			categories: this.createCategory(mycategory)
		});
	}

	createCategory(categoryInputs) {
		const arr = categoryInputs.map(category => {
			return new FormControl(category.selected || false)
		});
		return new FormArray(arr);
	}
	
	onSubmit(value) {
		this.isSubmitted = true;
    if(!this.newQuestionForm.value) {
      return false;
		}
		
		this.crudService.createNewQuestion(value)
		.then(
			res => {
				this.newQuestionForm.reset()
				this.router.navigate(['/']);
			}
		)
	}
	
}
