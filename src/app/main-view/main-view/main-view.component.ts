import {Component, OnInit} from '@angular/core';
import {Question} from "../../domain/Question";
import {QuestionService} from "../../service/question.service";
import {FormBuilder} from "@angular/forms";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  questions: Question[] = [];

  searchForm = this.formBuilder.group({
    search: ["", []]
  })

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService) {
  }

  ngOnInit() {
    this.getQuestions();
  }


  getQuestions() {
    let params = new HttpParams();
    const searchValue = this.searchForm.controls.search.value;
    if (searchValue) {
      params = params.set("question", searchValue);
    }

    this.questionService.getQuestions(params).subscribe({
      next: response => this.questions = response
    });
  }
}
