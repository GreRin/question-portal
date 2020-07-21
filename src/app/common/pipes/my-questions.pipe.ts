import { Pipe, PipeTransform } from '@angular/core';
import { QuestionData } from '../utils/question-data.model';

@Pipe({
  name: 'myQuestions'
})
export class MyQuestionsPipe implements PipeTransform {

  transform(items: QuestionData[], myQuestions: boolean, userId: string, email: string): QuestionData[] {
    if(myQuestions) {
      return items.filter(item => item.user.ownerId === userId || item.user.email === email)
    }
    return items;
  }

}
