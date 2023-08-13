import {Component, OnInit} from '@angular/core';
import {Question} from "../../domain/Question";
import {QuestionService} from "../../service/question.service";
import {FormBuilder} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {ZonedDateTime} from "@js-joda/core";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html'
})
export class MainViewComponent implements OnInit {

  loading: boolean = true;

  questions: Question[] = [];

  searchForm = this.formBuilder.group({
    search: ["", []]
  })

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService) {
  }

  ngOnInit() {
    this.getQuestions("");
    this.searchForm.controls.search.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(searchValue => this.getQuestions(searchValue)
    )

  }


  getQuestions(searchValue: string | null) {

    let params = new HttpParams();
    if (searchValue) {
      params = params.set("question", searchValue);
    }

    this.questionService.getQuestions(params).subscribe({
      next: response => {
        this.questions = response;
        //TODO: fix ZonedDateTime parsing
        // this.questions.sort((a, b) => a.updated.isAfter(b.updated) ? -1 : 1);
        this.loading = false;
      },
      error: () => {this.loading = false},
      complete: () => {this.loading = false}
    });
  }
}
