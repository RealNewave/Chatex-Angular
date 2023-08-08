import {Component, Input} from '@angular/core';
import {Answer} from "../../domain/Answer";

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent {

  @Input()
  public answer: Answer;

  @Input()
  public color: string | undefined;
}
