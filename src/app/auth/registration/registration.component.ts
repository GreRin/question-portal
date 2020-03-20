import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

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
