import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortQuestions'
})
export class SortQuestionsPipe implements PipeTransform {

  transform(items: any, questionData: any): any {
    if(items) {
      const direction = questionData ? -1 : 1;

      items.sort((a, b) => {
        let aa = a.currentDate;
        let bb = b.currentDate;
        if (aa > bb) {
          return -1 * direction;
        }
        else if (aa < bb) {
          return 1 * direction;
        } else {
          return 0;
        }
      })
    }
    return items;
  }
}
