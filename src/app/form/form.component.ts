import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
