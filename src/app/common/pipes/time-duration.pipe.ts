import { Pipe, PipeTransform } from '@angular/core';
import {QuestionData} from '../utils/question-data.model';

@Pipe({
  name: 'timeDuration'
})
export class TimeDurationPipe implements PipeTransform {

  transform(items: QuestionData[], duration: string ): QuestionData[] {
    if (!items || !duration) {
      return items;
    }
    const currentTime = (+new Date);
    const day = 24 * 60 * 60 * 1000;
    const week = 7 * day;
    const month = 31 * week;
    if(duration === 'day') {
      return items.filter(item => currentTime - item.currentDate < day);
    } else if (duration === 'week') {
      return items.filter(item => currentTime - item.currentDate < week);
    } else if (duration === 'month') {
      return items.filter(item => currentTime - item.currentDate < month);
    } else {
      return items;
    }
  }

}
