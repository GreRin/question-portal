import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortQuestions'
})
export class SortQuestionsPipe implements PipeTransform {

  transform(items: any, ASC: any): any {
    if(items) {
      items.sort((a, b) => ASC? a.currentDate - b.currentDate : b.currentDate - a.currentDate)
    }
    return items;
  }
}
