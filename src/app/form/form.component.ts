import { Component, OnInit, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {
	answer = [{
		type: 'yes',
		text: 'Да'
	}, {
		type: 'on',
		text: 'Нет'
	}]

	// @HostListener ('click') onMouseEnter() {
	// 	console.log('Hello!');
	// }
	
	submitForm(form: NgForm) {
		console.log('Submited!', form);
	}

  constructor() { }

  ngOnInit(): void {
  }

}
