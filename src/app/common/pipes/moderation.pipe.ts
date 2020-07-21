import { Pipe, PipeTransform } from '@angular/core';
import { QuestionData } from '../utils/question-data.model';

@Pipe({
  name: 'moderation'
})
export class ModerationPipe implements PipeTransform {

  transform(items: QuestionData[], filterModeration: boolean): QuestionData[] {
    if(!filterModeration) {
      return items;
    }
    return items.filter(item => item.approved === false);
  }
}
