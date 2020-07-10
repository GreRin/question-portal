import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { CrudService } from '../../common/services/crud/crud.service';

import { mycategory } from '../../common/utils/category';
import { QuestionData } from '../../common/utils/question-data.model';

@Component({
    selector: 'app-edit-question',
    templateUrl: './edit-question.component.html',
    styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

    mycat: string[] = mycategory;
    id: string;
    title: string;
    text: string;
    editQuestionForm: FormGroup;
    currentQuestion: QuestionData;
    questionData: QuestionData;
    sortedQuestions: string[];

    constructor(
        private crudService: CrudService,
    ) { }

    ngOnInit(): void {
        this.currentQuestion = this.crudService.editableQuestion;
        this.editQuestion();
    }

    editQuestion() {
        this.editQuestionForm = new FormGroup({
            title: new FormControl(this.currentQuestion.title, [Validators.required]),
            text: new FormControl(this.currentQuestion.text, [Validators.required]),
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
        if (!this.editQuestionForm.valid) {
           return false;
        }

        this.sortedQuestions = mycategory.filter(
            (el, index) => value.categories[index] === true
        );

        this.questionData = {
            approved: false,
            title: value.title,
            text: value.text,
            categories: this.sortedQuestions,
            currentDate: this.crudService.getDate()
        }

        this.crudService.updateQuestion(this.questionData);
        this.closePopup();
    }

    closePopup() {
        const closeButton = document.getElementById('editModal');
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        closeButton.classList.toggle('show');
        closeButton.setAttribute('style', 'display:none');
        modalBackdrop.remove();
    }
}
