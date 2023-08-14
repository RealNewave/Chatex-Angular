import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-close-question',
  templateUrl: './close-question.component.html',
  styleUrls: ['./lock-question.component.css']
})
export class CloseQuestionComponent {
  @Output()
  dataEvent = new EventEmitter<boolean>();
}
