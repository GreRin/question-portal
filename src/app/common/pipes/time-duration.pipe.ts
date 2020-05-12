import { Pipe, PipeTransform } from '@angular/core';
import {QuestionData} from '../utils/question-data.model';

@Pipe({
  name: 'timeDuration'
})
export class TimeDurationPipe implements PipeTransform {

  transform(items: QuestionData[], ASC: boolean): QuestionData[] {
    if (!items || !ASC ) {
      return items;
    }
    const currentTime = (+new Date);
    const day = 24 * 60 * 60 * 1000;
    const week = 7 * day;
    const month = 31 * week;
    return items.filter(item => currentTime - item.currentDate < week);
  }

}
