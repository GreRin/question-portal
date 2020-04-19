export class QuestionData {
	id: string;
	title: string;
	text: string;
	creationDate: Date;
	frontend: string;
	java: string;
	salesforce: string;
	user: {
		displayName: string;
		email: string;
		ownerId: string;
	};
	comments: {
		message: string;
		user: {
			displayName: string;
			email: string;
			ownerId: string;
		};
	}
}
