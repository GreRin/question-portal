import { Pipe, PipeTransform } from '@angular/core';
import { QuestionData } from '../utils/question-data.model';

@Pipe({
  name: 'myQuestions'
})
export class MyQuestionsPipe implements PipeTransform {
  transform(items: QuestionData[], myQuestions: string, userId: string, email: string): QuestionData[] {
    if(myQuestions === "userQuestions") {
      return items.filter(item => item.user.ownerId === userId || item.user.email === email);
    } else {
      return items;
    }
  }
}
