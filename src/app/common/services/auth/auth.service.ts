import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore  } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { constants } from '../../utils/constants';
import { auth } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../utils/user';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	signInMode = false;
	phoneSignIn = false;
	admin: boolean;
	email: string;
	isUser: boolean;
	author: boolean;
	userId: string;
	user: User;

	constructor(
		private afAuth: AngularFireAuth,
		private firestore: AngularFirestore,
		private router: Router
	) {
		this.author = false;
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
			this.afAuth.auth.signInWithPopup(this.getProviderInstance(provider))
			.then((ref) => {
				this.user = {
					email: ref.user.email,
					ownerId: ref.user.uid,
				}
				this.isAdmin();
				this.router.navigate(['/main']);
			}).catch(function(error) {
				console.error('Failed: ' + error);
			})
		} 
	}

	signInOrSignUp(email, password) {
		if(this.signInMode) {
			this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
				this.email = email;
				this.isAdmin();
				this.router.navigate(['/main']);
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
			this.admin = null;
			this.router.navigate(['/login']);
		})
	}

	isAdmin() : Observable<any> {
		if(this.admin !== null && this.admin !== undefined) {
			return of(this.admin)
		}
		const data = this.firestore.collection('admins',ref=> ref.where('email','==', this.user.email)).snapshotChanges();
		return data.pipe(map(results => {
				if(results.length) {
					results.find((result: any) => {
						let res = result.payload.doc.data()
						if(this.user.email === res.email) {
							this.admin = true;
						} else {
							this.admin = false;
						}
						return this.admin;
					})
				}
			})
		);
	}

	isAuth() {
		return this.afAuth.authState.pipe(map(res => {
			if(res && res.uid) {
				this.user = {
					email: res.email,
					ownerId: res.uid,
					isUser: true
				}
				return this.user;
			} else {
				this.user = {
					isUser: false
				}
				return this.user;
			}
		}))
	}
}
