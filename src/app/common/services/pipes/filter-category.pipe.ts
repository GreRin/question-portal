import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(items: any, questionData: any): any {
    return questionData
      ? items.filter(item => item.categories.includes('Java'))
      : items;
  }

}
