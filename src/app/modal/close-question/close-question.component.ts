import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-close-question',
  templateUrl: './close-question.component.html'
})
export class CloseQuestionComponent {
  @Output()
  dataEvent = new EventEmitter<boolean>();
}
