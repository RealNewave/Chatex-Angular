import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
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
    usernames: this.formBuilder.array([], [Validators.required])
  })
  usernames: Set<string> = new Set(["Ab", "Johan", "Marijjjjjjjj", "Magnusssssssssss", "Hikaru"]);
  createFailed: true;
  addedUsers: string[] = []

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
      this.questionService.createQuestion(this.questionForm.controls.question.value!, this.questionForm.controls.usernames.value as string[]).subscribe({
        next: response => {
          this.closeModal.nativeElement.click();
          //TODO: replace with component reload or something
          window.location.reload();
        },
        error: error => this.createFailed = true
      });
    }
  }


  updateAddedUsers(event: any, username: string): void {
    const checked = this.questionForm.controls.usernames as FormArray;
      if(event.target.checked){
        checked.push(new FormControl(event.target.value));
      } else {
        const index = checked.controls.findIndex(x => x.value === event.target.value);
        checked.removeAt(index);
      }
  }
}
