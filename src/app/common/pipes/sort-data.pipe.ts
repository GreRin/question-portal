import { Pipe, PipeTransform } from '@angular/core';
import {QuestionData} from '../utils/question-data.model';

@Pipe({
  name: 'sortData',
  pure: false
})
export class SortDataPipe implements PipeTransform {

  transform(items: QuestionData[], ASC: boolean): QuestionData[] {
    if(items) {
      items.sort((a, b) => ASC? a.currentDate - b.currentDate : b.currentDate - a.currentDate)
    }
    return items;
  }

}
