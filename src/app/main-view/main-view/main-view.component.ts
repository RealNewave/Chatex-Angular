import {Component, OnInit} from '@angular/core';
import {Question} from "../../domain/Question";
import {QuestionService} from "../../service/question.service";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit{

  questions: Question[] | undefined;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(){
    this.questionService.getQuestions().subscribe({
      next: response => {this.questions = response}
    })
  }


}
