import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from './types';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getQuestions(numberOfQuestions: number): Observable<Question[]> {
    return this.http.get<Question[]>('assets/json/questions.json').pipe(
      map((data: Question[]) => {
        const questions: Question[] = this.shuffle(data)
          .slice(0, numberOfQuestions)
          .map((question: Question, index) => ({
            ...question,
            options: this.shuffle(question.options),
            number: index + 1,
          }));

        return questions;
      })
    );
  }

  shuffle(array) {
    let m = array.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
}
