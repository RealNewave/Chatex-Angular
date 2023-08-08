import {Component, Input} from '@angular/core';
import {Question} from "../../domain/Question";

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.scss']
})
export class SubjectCardComponent {

  @Input()
  public question!: Question;

}
