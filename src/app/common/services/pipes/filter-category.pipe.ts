import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(items: any, filterTerm: any): any {
    if (!items || !filterTerm) {
      return items;
    }

    return items
      ? items.filter(item => item.categories.includes(filterTerm))
      : items;
  }
}
