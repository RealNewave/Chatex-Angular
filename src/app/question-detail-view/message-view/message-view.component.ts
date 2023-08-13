import {Component, Input} from '@angular/core';
import {Answer} from "../../domain/Answer";

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html'
})
export class MessageViewComponent {

  @Input()
  public answer: Answer;

  @Input()
  public color: string | undefined;

  @Input()
  public time: string;

}
