import { TestBed } from '@angular/core/testing';

import { QuestionWebsocketService } from './question-websocket.service';

describe('QuestionWebsocketService', () => {
  let service: QuestionWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
