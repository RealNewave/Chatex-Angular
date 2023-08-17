import {Component, OnInit} from '@angular/core';
import {Question} from "../../domain/Question";
import {QuestionService} from "../../service/question.service";
import {FormBuilder} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html'
})
export class MainViewComponent implements OnInit {
  loading: boolean = true;

  questions: Question[] = [];

  searchForm = this.formBuilder.group({
    search: ["", []],
    answered: ["", []]
  });


  constructor(private formBuilder: FormBuilder, private questionService: QuestionService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const queryParamMap = this.route.snapshot.queryParamMap;
    let search = queryParamMap.get("search");
    let answered = queryParamMap.get("answered");
    this.getQuestions(search, answered);
    this.searchForm.controls.search.setValue(search);
    this.searchForm.controls.answered.setValue(answered);
    this.searchForm.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        this.getQuestions(value.search, value.answered);
        this.router.navigate(["/"], {
          relativeTo: this.route,
          queryParams: {
            answered: value.answered,
            search: value.search
          },
          queryParamsHandling: "merge",
          skipLocationChange: false
        })
      }
    );
  }


  getQuestions(searchValue: string | null | undefined, answeredValue: string | null | undefined) {
    let params = new HttpParams();
    if (searchValue) {
      params = params.set("question", searchValue);
    }

    if(answeredValue && answeredValue !== "all"){
      params = params.set("answered", answeredValue !== "open");
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
