import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from "../../service/question.service";
import {ActivatedRoute} from "@angular/router";
import {Answer} from "../../domain/Answer";
import {QuestionWebsocketService} from "../../service/question-websocket.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ZonedDateTime} from "@js-joda/core";

@Component({
  selector: 'app-question-detail-view',
  templateUrl: './question-detail-view.component.html',
  styleUrls: ['./question-detail-view.component.scss']
})
export class QuestionDetailViewComponent implements OnInit, OnDestroy {
  question: string = "";
  answers: Answer[] = [];
  starter: string = "";
  questionId: string = "";
  minBrightness = 70;
  maxBrightness = 100;
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
          const answer = message as Answer;
          const latestCombinedAnswer = this.combinedAnswers[this.combinedAnswers.length - 1];
          if(latestCombinedAnswer && answer.username === latestCombinedAnswer.username && answer.timestamp === latestCombinedAnswer.timestamp) {
            latestCombinedAnswer.answer += "\n" + answer.answer;
            this.combinedAnswers[this.combinedAnswers.length - 1] = latestCombinedAnswer;
          }
          this.answers.push(answer);
        },
        error: (error) => console.log(error)
      });
      this.questionService.getQuestion(this.questionId).subscribe({
        next: response => {
          this.question = response.question;
          this.answers = response.answers;
          this.starter = response.starter;

          for (let i = 0; i < this.answers.length - 1; i++) {
            const currentValue = this.answers[i];
            let nextValue = this.answers[i + 1];
            let answer = currentValue.answer;
            while (currentValue.username === nextValue.username && currentValue.timestamp === nextValue.timestamp) {

              answer += "\n" + nextValue.answer;
              i++;
              nextValue = this.answers[i + 1] ? this.answers[i+1]: {
                "username": "",
                "answer": "",
                "timestamp": ZonedDateTime.now()
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



  private assignColors() {
    this.combinedAnswers.forEach(answer => {
      if (!this.usernameColors.has(answer.username)) {
        const generatedColor = this.generateRandomLightColor();
        this.usernameColors.set(answer.username, generatedColor);
      }
    });
  }
  generateRandomLightColor = (): string => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
    if (brightness >= this.minBrightness && brightness <= this.maxBrightness) {
      return `rgb(${red}, ${green}, ${blue})`;
    }
    return this.generateRandomLightColor();
  }

  isOwnMessage = (username: string):boolean => {
    return localStorage.getItem("username") === username;
  }

  sendResponse() {
    this.questionWebsocketService.answerQuestion(this.questionId, this.replyForm.controls.reply.value!);
    this.replyForm.controls.reply.reset();
  }

  ngOnDestroy(): void {
    this.questionWebsocketService.disconnect(this.questionId);
  }
}
