import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { rejects } from 'assert';

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
				email: new FormControl('', [Validators.required, Validators.email], [this.checkForEmail]),
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

	// check email
	checkForEmail(control: FormControl): Promise <any> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (control.value === 'test@mail.ru') {
					resolve({
						'emailIsUsed': true
					})
				} else {
					resolve(null);
				}
			}, 1000)
		});
	}
}
