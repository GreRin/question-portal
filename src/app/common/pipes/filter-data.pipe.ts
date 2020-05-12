import { Pipe, PipeTransform } from '@angular/core';
import {QuestionData} from '../utils/question-data.model';

@Pipe({
  name: 'filterData'
})
export class FilterDataPipe implements PipeTransform {

  transform(items: QuestionData[], filterTerm: string): QuestionData[] {
    if (!items || !filterTerm || filterTerm === '') {
      return items;
    }

    items.map(item => item.categories.forEach(item => {
      item.toLowerCase()
    }));
    console.log(items);
    return items.filter(item => item.categories.includes(filterTerm));
  }

}
