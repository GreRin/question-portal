import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

	form: FormGroup;
  ngOnInit(): void {
		this.form = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email], [this.checkForEmail]),
			password: new FormControl(null, [Validators.required, Validators.minLength(6)])
		})
  }

	onSubmit() {
		console.log(this.form);
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
