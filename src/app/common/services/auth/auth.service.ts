import { Injectable } from '@angular/core';

import { AngularFirestore  } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { admin, constants } from '../../utils/constants';
import { auth } from 'firebase/app';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	signInMode = false;
	phoneSignIn = false;

	constructor(
		private afAuth: AngularFireAuth,
		private firestore: AngularFirestore,
	) {}

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
			this.afAuth.auth.signInWithPopup(this.getProviderInstance(provider)).then((ref) => {
				this.isAdmin(ref.user.email);
			}).catch(function(error) {
				console.error('Failed: ' + error);
			})
		} 
		// else {
		// 	this.afAuth.auth.signInWithRedirect(this.getProviderInstance(provider)).then((ref) => {
		// 		this.isAdmin(ref.user.email);
		// 	}).catch((error) => {
		// 		console.log('Failed: ' + error);
		// 	})
		// }
	}

	signInOrSignUp(email, password) {
		if(this.signInMode) {
			this.afAuth.auth.signInWithEmailAndPassword(email, password).then((ref) => {
				this.isAdmin(email);
			}).catch((error) => {
				console.error('Failed: ' + error);
			});
		} else {
			this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((ref) => {
				console.log(ref.user.email);
			}).catch((error) => {
				console.error('Failed: ' + error);
			});
		}
	}

	logOut() {
		this.afAuth.auth.signOut()
		.then(() => {
			admin.admin = false;
		})
	}

	isAdmin(email) {
		this.firestore.collection('admins',ref=> ref.where('email','==', email)).snapshotChanges()
		.subscribe(results => {
			if(results.length) {
				results.forEach((result: any) => {
					let res = result.payload.doc.data()
					if(email === res.email) {
						admin.admin = true;
					}
				})
			}
		});
	}
}
