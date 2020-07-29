import { Pipe, PipeTransform } from '@angular/core';
import { QuestionData } from '../utils/question-data.model';

@Pipe({
  name: 'moderation'
})
export class ModerationPipe implements PipeTransform {
  transform(items: QuestionData[], filterModeration: boolean, filterMyQuestions: boolean, unfilterQuestions: boolean, userId: string, email: string): QuestionData[] {
   console.log(filterModeration, filterMyQuestions, unfilterQuestions)
    let arr = [...items];
    if (!items && !filterModeration && !filterMyQuestions) {
      return arr;
    };

    if (unfilterQuestions) {
      return arr;
    } else if(filterMyQuestions) {
      return arr.filter(item => item.user.ownerId === userId || item.user.email === email);
    } else if (filterModeration) {
      return arr.filter(item => item.approved === false);
    }
  }
}
