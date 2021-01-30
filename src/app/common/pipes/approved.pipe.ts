import { Pipe, PipeTransform } from '@angular/core';
import {QuestionData} from '../utils/question-data.model';

@Pipe({
  name: 'approved'
})
export class ApprovedPipe implements PipeTransform {

  transform(items: QuestionData[], admin: boolean): QuestionData[] {
    if(!items) {
      return []
    } else if (admin) {
      return items;
    }
    return items.filter(item => item.approved === true);
  }

}
