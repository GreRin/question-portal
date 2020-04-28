import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import {ActivatedRoute, Params, Router} from '@angular/router';
import { CrudService } from '../../common/services/crud/crud.service';

import { mycategory } from '../../common/utils/category';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  mycat = mycategory;
  id: string;
  title: any;
  text: any;
  editQuestionForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private crudService: CrudService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

    });
    this.editQuestion()
    console.log(this.id)
  }

  editQuestion() {
    this.editQuestionForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      text: new FormControl("", [Validators.required]),
      categories: this.createCategory(mycategory)
    });
  }

  createCategory(categoryInputs) {
    const arr = categoryInputs.map(category => {
      return new FormControl(category)
    });
    return new FormArray(arr);
  }

  onSubmit(value) {
    if (!this.editQuestionForm.valid) {
      return false;
    }

    console.log(value)
    // this.crudService.editQuestion(value);
    // this.editQuestionForm.reset();
  }

}
