import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from "../../service/question.service";
import {ActivatedRoute} from "@angular/router";
import {Answer} from "../../domain/Answer";
import {QuestionWebsocketService} from "../../service/question-websocket.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ZonedDateTime} from "@js-joda/core";
@Component({
  selector: 'app-question-detail-view',
  templateUrl: './question-detail-view.component.html'
})
export class QuestionDetailViewComponent implements OnInit, OnDestroy {
  question: string = "";
  answers: Answer[] = [];
  starter: string = "";
  questionId: string = "";
  answered: boolean = false;
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
          // const latestCombinedAnswer = this.combinedAnswers[this.combinedAnswers.length - 1];
          // if(latestCombinedAnswer && answer.username === latestCombinedAnswer.username && answer.timestamp === latestCombinedAnswer.timestamp) {
          //   latestCombinedAnswer.answer += "\n" + answer.answer;
          //   this.combinedAnswers[this.combinedAnswers.length - 1] = latestCombinedAnswer;
          // }
          this.answers.push(answer);
        },
        error: (error) => console.log(error)
      });
      this.questionService.getQuestion(this.questionId).subscribe({
        next: response => {
          this.question = response.question;
          this.answers = response.answers;
          this.starter = response.starter;
          this.answered = response.answered;
          if(this.answered){
            this.replyForm.controls.reply.setValue("This question has been closed by the starter...");
            this.replyForm.disable();
          }
          this.assignColors();
        }
      });
    });
  }

  public splitTimestamp(timestamp: string): string[] {
    const splitTimeStamp = timestamp.split("T")
    const date = splitTimeStamp[0];
    const time = splitTimeStamp[1].split(".")[0];
    return [date, time];
  }

  private assignColors() {
    this.answers.forEach(answer => {
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

  closeQuestion(response: boolean){
    if(response) {
      this.questionService.closeQuestion(this.questionId).subscribe({
        next: () => this.answered = true
      });
    }
  }

  ngOnDestroy(): void {
    this.questionWebsocketService.disconnect(this.questionId);
  }

  addEmoji(event: any) {
    const reply = this.replyForm.controls.reply;
    reply.setValue(reply.value + event.emoji.native);
  }
}
