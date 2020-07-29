import { Pipe, PipeTransform } from '@angular/core';
import { QuestionData } from '../utils/question-data.model';

@Pipe({
  name: 'moderation'
})
export class ModerationPipe implements PipeTransform {
  transform(items: QuestionData[], filterModeration: boolean, filterMyQuestions: boolean, unfilterQuestions: boolean, userId: string, email: string): QuestionData[] {

    if (!items && !filterModeration && !filterMyQuestions) {
      return items;
    };

    if (unfilterQuestions) {
      return items;
    } else if(filterMyQuestions) {
      return items.filter(item => item.user.ownerId === userId || item.user.email === email);
    } else if (filterModeration) {
      return items.filter(item => item.approved === false);
    }

    return items;
  }
}
