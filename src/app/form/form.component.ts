import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})

export class FormComponent implements OnInit {
	form: FormGroup;
  ngOnInit(): void {
		this.form = new FormGroup({
			user: new FormGroup({
				email: new FormControl('', [Validators.required, Validators.email]),
				password: new FormControl('', [Validators.required, this.checkForLength])
			})
		})
  }

	onSubmit() {
		console.log(this.form);
	}

	// {'errorCode': true}
	checkForLength(control: FormControl) {
		if (control.value.length <= 4) {
			return {
				'lengthError': true
			};
		}
		return null;
	}
}
