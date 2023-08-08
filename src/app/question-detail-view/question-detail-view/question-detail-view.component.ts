import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../service/question.service";
import {ActivatedRoute} from "@angular/router";
import {Answer} from "../../domain/Answer";
import {QuestionWebsocketService} from "../../service/question-websocket.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-question-detail-view',
  templateUrl: './question-detail-view.component.html',
  styleUrls: ['./question-detail-view.component.scss']
})
export class QuestionDetailViewComponent implements OnInit {
  question: string = "";
  answers: Answer[] = [];
  starter: string = "";
  questionId: string = "";

  usernameColors: Map<string, string> = new Map();

  replyForm = this.formBuilder.group({
    reply: ["", [Validators.required]]
  });


  constructor(private formBuilder: FormBuilder, private questionService: QuestionService, private activatedRoute: ActivatedRoute, private questionWebsocketService: QuestionWebsocketService) {
  }

  combinedAnswers: Answer[] = [];

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.questionId = params["questionId"];
      this.questionWebsocketService.connect(this.questionId).subscribe({
        next: (message) => {
          this.answers.push(message as Answer);
        },
        error: (error) => console.log(error)
      });
      this.questionService.getQuestion(this.questionId).subscribe({
        next: response => {
          this.question = response.question;
          this.answers = response.answers;
          this.starter = response.starter;


          for (let i = 0; i < this.answers.length; i++) {
            const currentValue = this.answers[i];
            let nextValue = this.answers[i + 1];
            let answer = currentValue.answer;
            while (currentValue.username === nextValue.username) {
              answer += "\n" + nextValue.answer;
              i++;
              nextValue = this.answers[i + 1] ? this.answers[i+1]: {
                "username": "",
                "answer": "",
                "timestamp": ""
              } as Answer;
            }
            this.combinedAnswers.push({
              "username": currentValue.username,
              "answer": answer,
              "timestamp": currentValue.timestamp
            } as Answer);
          }
          this.assignColors();
        }
      });
    });
  }

  randomNumber = (): number => Math.floor(Math.random() * 16);

  private assignColors() {
    this.combinedAnswers.forEach(answer => {
      if (!this.usernameColors.has(answer.username)) {
        let generatedColor = "";
        for (let i = 0; i < 6; i++) {
          const number = this.randomNumber();
          generatedColor += number >= 10 ? String.fromCharCode(number - 10 + 97) : number;
        }
        this.usernameColors.set(answer.username, "#" + generatedColor);
      }
    });
  }

  sendResponse() {
    this.questionWebsocketService.answerQuestion(this.questionId, this.replyForm.controls.reply.value!);
    this.replyForm.controls.reply.reset();
  }
}
