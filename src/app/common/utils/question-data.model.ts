import { User } from '../utils/usert';
import {Comments} from './comments';

export class QuestionData {
	id: string;
	title: string;
	text: string;
	currentDate: string;
	frontend: string;
	java: string;
	salesforce: string;
	categories: string[];
	user: User;
	comments: Comments[];
}
