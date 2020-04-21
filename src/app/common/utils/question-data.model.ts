export class QuestionData {
	id: string;
	title: string;
	text: string;
	currentDate: Date;
	frontend: string;
	java: string;
	salesforce: string;
	categories: string[];
	user: {
		displayName: string;
		email: string;
		ownerId: string;
	};
	comments: {
		message: string;
		currentDate: Date;
		user: {
			displayName: string;
			email: string;
			ownerId: string;
		};
	}
}
