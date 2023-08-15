import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../domain/Question";

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html'
})
export class SubjectCardComponent implements OnInit{

  @Input()
  question: Question;
  color: string;
  responders: string;


  ngOnInit(): void {
    this.responders = this.question.responders.map(responder => responder.username).join(", ");
    this.color = this.generateRandomColor();
  }

  private generateRandomColor = (): string => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  }
}
