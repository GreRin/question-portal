import { User } from './user';
import {Comments} from './comments';

export class QuestionData {
	id?: string;
	title?: string;
	text?: string;
	currentDate: number;
	categories?: string[];
	user?: User;
	comments?: Comments[];
	approved: boolean;
}
