import { Pipe, PipeTransform } from '@angular/core';
import {QuestionData} from '../utils/question-data.model';

@Pipe({
  name: 'answered'
})
export class AnsweredPipe implements PipeTransform {

  transform(items: QuestionData[], ASC: boolean): QuestionData[] {
    if (!items || !ASC ) {
      return items;
    }

    return items.filter(item => item.comments.forEach(item => item.resolveComment === true));
  }
}
