import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})

export class FormComponent implements OnInit {
	form: FormGroup;
  ngOnInit(): void {
		this.form = new FormGroup({
			email: new FormControl(''),
			password: new FormControl('')
		})
  }

	onSubmit() {
		console.log(this.form);
	}
}
