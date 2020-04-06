import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { constants } from '../utils/constants';
import { auth } from 'firebase';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
	uid: string;
	email: string;
	password: string;
	name: string;
}

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	signInMode = false;
	phoneSignIn = false;
	signInError = false;

	user: Observable<User>;

	constructor(
		private afAuth: AngularFireAuth, 
		private afs: AngularFirestore) 
	{
		// this.user = this.afAuth.authState.pipe(switchMap(user => {
		// 		if (user) {
		// 				return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
		// 		} else {
		// 				return of(null);
		// 		}
		// })
	// );
	}

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
