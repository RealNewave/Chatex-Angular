import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../domain/Question";

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html'
})
export class SubjectCardComponent implements OnInit{

  @Input()
  public question: Question;

  participantSet: Set<string> = new Set();
  color: string;


  ngOnInit(): void {
    this.setParticipants();
    this.color = this.generateRandomColor();
  }

  private generateRandomColor = (): string => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  private setParticipants = () => this.question.answers.forEach(answer => answer.username === this.question.starter ? null : this.participantSet.add(" " + answer.username));
  getParticipants = (): string[] => Array.from(this.participantSet);
}
