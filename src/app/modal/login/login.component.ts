import {Component, ElementRef, ViewChild} from '@angular/core';
import {QuestionService} from "../../service/question.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  @ViewChild("closeModal") closeModal: ElementRef;

  loginForm = this.formBuilder.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService) {
  }

  public close(): void {
    // Close the modal
    this.closeModal.nativeElement.click();
  }

  login() {
    if(this.loginForm.valid) {

      this.questionService.login(this.loginForm.controls.username.value!, this.loginForm.controls.password.value!)
        .subscribe({
          next: response => {
            this.closeModal.nativeElement.click();
            //TODO: replace with component reload or something
            window.location.reload();
          }
        });
    }
  }
  create() {
    if(this.loginForm.valid) {
      this.questionService.createResponder(this.loginForm.controls.username.value!, this.loginForm.controls.password.value!)
        .subscribe({
          next: response => this.login()
        });
    }
  }
}
