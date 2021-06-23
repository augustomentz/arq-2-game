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

enum GameDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent {
  GameStatus = GameStatus;
  GameDifficulty = GameDifficulty;
  questions: Question[] = [];
  question: Question;
  gameStatus = GameStatus.NOT_STARTED;
  difficulty = GameDifficulty.EASY;
  answer = null;
  lifes = ['LIFE', 'LIFE', 'LIFE', 'LIFE', 'LIFE'];
  youMistake = false;

  constructor(private service: AppService) {}

  async start() {
    let numberOfQuestions;

    switch (this.difficulty) {
      case GameDifficulty.EASY:
        numberOfQuestions = 15;
        break;
      case GameDifficulty.MEDIUM:
        numberOfQuestions = 20;
        break;
      case GameDifficulty.HARD:
        numberOfQuestions = 25;
        break;
      default:
        numberOfQuestions = 15;
    }

    this.questions = await this.service
      .getQuestions(numberOfQuestions)
      .toPromise();

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
    this.answer = null;
  }

  error() {
    this.youMistake = true;

    setTimeout(() => {
      this.youMistake = false;
    }, 2000);

    if (this.lifes.length < 2) {
      this.gameStatus = GameStatus.GAME_OVER;
      this.answer = null;

      return;
    }

    this.lifes = this.lifes.slice(0, -1);
  }
}
