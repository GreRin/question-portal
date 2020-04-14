import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { CrudService } from '../../common/services/crud/crud.service';

import * as _ from "lodash";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

  mycategory: any = [
    {
      name: "Java",
			value: "java",
			selected: true
    },
    {
      name: "Salesforce",
      value: "salesforce",
      selected: false
    },
    {
      name: "Frontend",
      value: "frontend",
      selected: false
    }
  ];

	title: any;
	text: any;
	isSubmitted = false;
	selectedCategoryNames: string[];
	newQuestionForm: FormGroup;

  constructor(
		private router: Router,
		public crudService: CrudService,
	) {}

  ngOnInit(): void {
		this.createNewQuestion()
	}

	createNewQuestion() {
		this.newQuestionForm = new FormGroup({
			title: new FormControl("", [Validators.required]),
			text: new FormControl("", [Validators.required]),
			categories: this.createCategory(this.mycategory)
		});
		this.getSelectedCategory();
	}

	createCategory(categoryInputs) {
		const arr = categoryInputs.map(category => {
			return new FormControl(category.selected || false)
		});
		return new FormArray(arr);
	}

	getSelectedCategory() {
		this.selectedCategoryNames = _.map(
			this.newQuestionForm.controls.categories["category"],
			(categ, i) => {
				return categ.value && this.mycategory[i].value;
			}
		)
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
