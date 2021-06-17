import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Question } from '../types';

enum GameStatus {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  GAME_OVER = 'GAME_OVER',
  GAME_WON = 'GAME_WON',
}

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements OnInit {
  GameStatus = GameStatus;
  questions: Question[] = [];
  question: Question;
  gameStatus = GameStatus.NOT_STARTED;
  answer = null;
  lifes = ['LIFE', 'LIFE', 'LIFE', 'LIFE', 'LIFE'];

  constructor(private service: AppService) {}

  async ngOnInit() {
    this.questions = await this.service.getQuestions().toPromise();

    console.log(this.gameStatus);
  }

  async start() {
    [this.question] = this.questions;

    this.lifes = ['LIFE', 'LIFE', 'LIFE', 'LIFE', 'LIFE'];
    this.gameStatus = GameStatus.STARTED;
  }

  next(question: Question, questionNumber: number) {
    if (question.answer === this.answer) {
      this.nextQuestion(questionNumber);
    } else {
      this.error();
    }
  }

  restart() {
    this.gameStatus = GameStatus.NOT_STARTED;
  }

  nextQuestion(index: number) {
    if (!this.questions[index]) {
      this.gameStatus = GameStatus.GAME_WON;

      return;
    }

    this.question = this.questions[index];
  }

  error() {
    if (this.lifes.length < 2) {
      this.gameStatus = GameStatus.GAME_OVER;

      return;
    }

    this.lifes = this.lifes.slice(0, -1);
  }
}
