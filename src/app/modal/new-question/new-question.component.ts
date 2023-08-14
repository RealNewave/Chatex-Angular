import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {QuestionService} from "../../service/question.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit{

  @ViewChild("closeModal") closeModal: ElementRef;

  questionForm = this.formBuilder.group({
    question: ["", [Validators.required]],
    users: []
  })
  usernames: Set<string> = new Set();
  createFailed: true;

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService) {
  }

  ngOnInit() {
    const params = new HttpParams();

    this.questionService.getQuestions(params).subscribe({
      next: response => {
        const allUsernames = response.flatMap(question => question.answers.map(answer => answer.username));
        allUsernames.forEach(username => this.usernames.add(username));
      }
    });
  }

  createQuestion() {
    if (this.questionForm.valid) {
      this.questionService.createQuestion(this.questionForm.controls.question.value!).subscribe({
        next: response => {
          this.closeModal.nativeElement.click();
          //TODO: replace with component reload or something
          window.location.reload();
        },
        error: error => this.createFailed = true
      });
    }
  }
}
