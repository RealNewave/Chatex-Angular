import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseQuestionComponent } from './close-question.component';

describe('NewQuestionComponent', () => {
  let component: CloseQuestionComponent;
  let fixture: ComponentFixture<CloseQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseQuestionComponent]
    });
    fixture = TestBed.createComponent(CloseQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
