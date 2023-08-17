import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QuestionService} from "../../service/question.service";
import {ActivatedRoute} from "@angular/router";
import {Answer} from "../../domain/Answer";
import {QuestionWebsocketService} from "../../service/question-websocket.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Question} from "../../domain/Question";

@Component({
  selector: 'app-question-detail-view',
  templateUrl: './question-detail-view.component.html'
})
export class QuestionDetailViewComponent implements OnInit, OnDestroy {

  @ViewChild("toastPlaceHolder") toastPlaceholder :ElementRef;
  question: Question;
  questionId: string = "";
  username: string  = "";
  minBrightness = 70;
  maxBrightness = 100;


  toastList: string[] = [];
  usernameColors: Map<string, string> = new Map();
  replyForm = this.formBuilder.group({
    reply: ["", [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService,
              private activatedRoute: ActivatedRoute, private questionWebsocketService: QuestionWebsocketService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.username = localStorage.getItem("username")!;
      this.questionId = params["questionId"];
      this.questionWebsocketService.connect(this.questionId, this.username!).subscribe({
        next: (message) => {
          const answer = message as Answer;
          this.question.answers.push(answer);
        },
        error: (error) => console.log(error)
      });
      this.questionService.getQuestion(this.questionId).subscribe({
        next: response => {
          this.question = response;
          this.handleQuestionState();
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
    this.question.answers.forEach(answer => {
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
    return this.username === username;
  }

  sendResponse() {
    this.questionWebsocketService.answerQuestion(this.questionId, this.replyForm.controls.reply.value!, this.username);
    this.replyForm.controls.reply.reset();
  }

  closeQuestion(){
    this.question.answered = !this.question.answered;
    this.handleQuestionState();
    this.updateQuestion();
    this.showToast(`Your question has been marked as ${this.question.answered ? "answered" : "unanswered"}!`);
  }

  private handleQuestionState() {
    if (this.question.answered) {
      this.replyForm.controls.reply.setValue("This question has been closed by the starter...");
      this.replyForm.disable();
    } else {
      this.replyForm.controls.reply.reset();
      this.replyForm.enable();
    }
  }

  openToPublic() {
    this.question.openToPublic = !this.question.openToPublic;
    this.updateQuestion();
    this.showToast(`Your question is now ${this.question.openToPublic ? "closed" : "open"} to the public!`);
  }

  async shareLink(){
    await navigator.clipboard.writeText(document.documentURI);
    this.showToast("Link copied to clipboard!");
  }


  private showToast(toastText: string) {
    this.toastList.push(toastText);
    setTimeout(() => {
      this.toastList.shift();
    }, 1700);
  }

  addEmoji(event: any) {
    const reply = this.replyForm.controls.reply;
    reply.setValue(reply.value + event.emoji.native);
  }

  private updateQuestion(){
    this.questionService.updateQuestion(this.questionId, this.question).subscribe({
      error: () => console.log("update failed")
    });
  }

  ngOnDestroy(): void {
    this.questionWebsocketService.disconnect();
  }

}
