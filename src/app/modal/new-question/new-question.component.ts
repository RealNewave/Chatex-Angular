import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {QuestionService} from "../../service/question.service";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent {

  @ViewChild("closeModal") closeModal: ElementRef;


  questionForm = this.formBuilder.group({
    question: ["", [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService) {
  }

  createQuestion() {
    if (this.questionForm.valid) {
      this.questionService.createQuestion(this.questionForm.controls.question.value!).subscribe({
        next: response => {
          this.closeModal.nativeElement.click();
          //TODO: replace with component reload or something
          window.location.reload();
        }
      });
    }
  }
}
