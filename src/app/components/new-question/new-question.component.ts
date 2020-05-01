import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { CrudService } from '../../common/services/crud/crud.service';

import { mycategory } from '../../common/utils/category';
import { QuestionData } from '../../common/utils/question-data.model';

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
	newQuestionForm: FormGroup;
  questionData: QuestionData;
  sortedQuestions: string[];

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
    if (!this.newQuestionForm.valid) {
      return false;
    }

    this.sortedQuestions = mycategory.filter(
      (el, index) => value.categories[index] === true
    );

    this.questionData = {
      title: value.title,
      text: value.text,
      categories: this.sortedQuestions,
      currentDate: this.crudService.getDate(),
      user: {
        ownerId: this.crudService.id,
        displayName: this.crudService.name,
        email: this.crudService.email,
        avatar: this.crudService.avatar,
      },
      comments: []
    }

    this.crudService.createNewQuestion(this.questionData)
      .then(
        res => {
          this.newQuestionForm.reset()
          this.router.navigate(['/']);
        }
      )
  }
}
