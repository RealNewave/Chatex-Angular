import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../service/question.service";
import {ActivatedRoute} from "@angular/router";
import {Answer} from "../../domain/Answer";
import {QuestionWebsocketService} from "../../service/question-websocket.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-question-detail-view',
    templateUrl: './question-detail-view.component.html',
    styleUrls: ['./question-detail-view.component.css']
})
export class QuestionDetailViewComponent implements OnInit {
    question: string = "";
    answers: Answer[] = [];
    starter: string = "";
    questionId: string = "";

    replyForm = this.formBuilder.group({
        reply: ["", [Validators.required]]
    });

    constructor(private formBuilder: FormBuilder, private questionService: QuestionService, private activatedRoute: ActivatedRoute, private questionWebsocketService: QuestionWebsocketService) {
    }

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
                    console.log(response);
                }
            });
        });


    }

    sendResponse() {
        this.questionWebsocketService.answerQuestion(this.questionId, this.replyForm.controls.reply.value!);
        this.replyForm.controls.reply.reset();
    }
}
