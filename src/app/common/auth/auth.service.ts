import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { constants } from '../utils/constants';
import { auth } from 'firebase';

@Injectable()

export class AuthService {

	signInMode = false;
	phoneSignIn = false;
	signInError = false;

	constructor(private afAuth: AngularFireAuth) {}

	private getProviderInstance(provider: string) {
		let providerInstance;

		switch(provider) {
			case constants.providers.GOOGLE:
				providerInstance = new auth.GoogleAuthProvider();
				break;
			case constants.providers.FACEBOOK:
				providerInstance = new auth.FacebookAuthProvider();
				break;
			case constants.providers.GITHUB:
				providerInstance = new auth.GithubAuthProvider();
				break;
			default:
				providerInstance = new auth.GoogleAuthProvider();
		}
		return providerInstance;
	}
	
	signIn(mode: string, provider: string) {
		if(mode === constants.modes.POPUP) {
			this.afAuth.auth.signInWithPopup(this.getProviderInstance(provider)).then(function(ref) {
				console.log(ref)
			}).catch(function(error) {
				console.log('Failed: ' + error);
			})
		} else {
			this.afAuth.auth.signInWithRedirect(this.getProviderInstance(provider)).then(function(ref) {
				console.log(ref)
			}).catch(function(error) {
				console.log('Failed: ' + error);
			})
		}
	}

	signInOrSignUp(email, password) {
		if(this.signInMode) {
			this.afAuth.auth.signInWithEmailAndPassword(email, password).then(function(ref) {
				console.log(ref)
			}).catch(function(error) {
				console.log('Failed: ' + error);
			});
		} else {
			this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(function(ref) {
				console.log(ref);
			}).catch(function(error) {
				console.log('Failed: ' + error);
			});
		}
	}

	logOut() {
		this.afAuth.auth.signOut();
	}
}
