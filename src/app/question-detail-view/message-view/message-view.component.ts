import {Component, Input, OnInit} from '@angular/core';
import {Answer} from "../../domain/Answer";

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit{

  @Input()
  public answer: Answer;

  @Input()
  public color: string | undefined;

  public date: string;
  public time: string;

  ngOnInit(): void {
    const splitTimeStamp = this.answer.timestamp.split("T");
    this.date = splitTimeStamp[0];
    this.time = splitTimeStamp[1].split(".")[0];
  }
}
