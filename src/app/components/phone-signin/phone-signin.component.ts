import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { WindowService } from 'src/app/common/window/window.service';
import { AuthService } from 'src/app/common/auth/auth.service';

@Component({
  selector: 'app-phone-signin',
  templateUrl: './phone-signin.component.html',
  styleUrls: ['./phone-signin.component.css']
})
export class PhoneSigninComponent implements OnInit, AfterViewInit {

	windowRef: any;
	phoneNumber: string;
	otp: string;
	disableOTPSendButton: boolean = true;

	constructor(
		public afAuth: AngularFireAuth,
		private authService: AuthService,
		private windowService: WindowService
	) {}

  ngOnInit(): void {
		this.windowRef = this.windowService.windowRef;
	}

	ngAfterViewInit() {
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        this.disableOTPSendButton = false;
      }
    });
    this.windowRef.recaptchaVerifier.render();
  }
	
	sendOTP() {
    this.afAuth.auth.signInWithPhoneNumber(this.phoneNumber, this.windowRef.recaptchaVerifier).then((confirmationResult) => {
      this.windowRef.confirmationResult = confirmationResult;
    });
  }

  verifyOTP() {
    this.windowRef.confirmationResult.confirm(this.otp)
      .then((userCredentials) => console.log(userCredentials));
	}

	togglePhoneSignIn() {
		this.authService.phoneSignIn = !this.authService.phoneSignIn
	}
}
