import { Pipe, PipeTransform } from '@angular/core';
import { QuestionData } from '../utils/question-data.model';

@Pipe({
  name: 'moderation'
})
export class ModerationPipe implements PipeTransform {
  transform(items: QuestionData[], filterModeration: string, filterMyQuestions: string, unfilterQuestions: string, userId: string, email: string): QuestionData[] {
    if (!items && !filterModeration && !filterMyQuestions) {
      return items;
    }
    if (filterModeration === 'onModeration') {
      return items.filter(item => item.approved === false);
    } else if(filterMyQuestions === "userQuestions") {
      return items.filter(item => item.user.ownerId === userId || item.user.email === email);
    } else if (unfilterQuestions === 'all') {
      return items;
    }
  }
}
