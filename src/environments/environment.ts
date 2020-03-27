// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey: "AIzaSyAUghPXcM2794AjPUJ-kU7upqDxp8jlKf4",
    authDomain: "avid-water-265520.firebaseapp.com",
    databaseURL: "https://avid-water-265520.firebaseio.com",
    projectId: "avid-water-265520",
    storageBucket: "avid-water-265520.appspot.com",
    messagingSenderId: "912380236631",
    appId: "1:912380236631:web:9f6b82e5ce92d0ebb7a412"
	},
	modes: {
		POPUP: 'popup'
	},
	providers: {
		GOOGLE: 'google',
		FACEBOOK: 'facebook',
		GITHUB: 'github'
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
