import { Pipe, PipeTransform } from '@angular/core';
import {QuestionData} from '../utils/question-data.model';

@Pipe({
  name: 'answered'
})
export class AnsweredPipe implements PipeTransform {

  transform(items: QuestionData[], resolve: string): QuestionData[] {
    if (!items || !resolve ) {
      return items;
    }
    if(resolve === 'answered') {
      return items.filter(item => item.comments.some(item => item));
    } else if (resolve === 'all') {
      return items
    }
  }
}
