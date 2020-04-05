import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrudService } from '../../common/crud/crud.service';
import '@firebase/firestore';

import * as _ from "lodash";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

	title: any;
	text: any;
	java: string;
	salesforce: string;
	frontend: string;
	isSubmitted = false;
	newQuestionForm: FormGroup;

	users: Observable<any[]>;

  constructor(
		private router: Router,
		public crudService: CrudService
	) {}

  ngOnInit(): void {
		this.createNewQuestion()
	}

	createNewQuestion() {
		this.newQuestionForm = new FormGroup({
			title: new FormControl("", [Validators.required]),
			text: new FormControl("", [Validators.required]),
			java: new FormControl(""),
			salesforce: new FormControl(""),
			frontend: new FormControl(""),
		})
	}

	resetFields() {
		if(this.newQuestionForm.valid) {
			this.newQuestionForm.reset()
		}
  }
	
	onSubmit(value) {
		this.isSubmitted = true;
    if(!this.newQuestionForm.value) {
      return false;
    }
		console.log(this.newQuestionForm);

		this.crudService.createNewQuestion(value)
		.then(
			res => {
				this.resetFields();
				this.router.navigate(['/']);
			}
		)
	}
}
