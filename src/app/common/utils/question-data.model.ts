import { User } from '../utils/usert';
import {Comments} from './comments';

export class QuestionData {
	id?: string;
	title: string;
	text: string;
	currentDate: Date;
	categories: string[];
	user?: User;
	comments?: Comments[];
}
