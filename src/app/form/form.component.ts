import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})

export class FormComponent implements OnInit {
	// @ViewChild('form') form: NgForm;

	user: {
		email: '',
		password: ''		
	}

	formData = {};
	isSubmited = false;

	submitForm(form: NgForm) {
		this.isSubmited = true;
		this.formData = form.value;
		console.log(form.value);
		form.reset();
	}

  constructor() {}

  ngOnInit(): void {
		// this.form.setValue({
		// 	user: {
		// 		pass: '',
		// 		email: ''
		// 	}
		// });	
  }

}
