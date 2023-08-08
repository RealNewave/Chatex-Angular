import {Injectable} from '@angular/core';
import {Answer} from "../domain/Answer";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionWebsocketService {

  private socket: WebSocket;
  constructor() {
  }

  connect(questionId: string):Observable<Answer> {
    this.socket = new WebSocket(`ws://localhost:8080/api/v1/questions/${questionId}/${localStorage.getItem("username")}`, );
    return new Observable(observer =>{
      this.socket.onmessage = (event) => observer.next(JSON.parse(event.data));
      this.socket.onerror = (event) => observer.error(event);
      this.socket.onclose = () => observer.complete();

    });

  }

  answerQuestion(questionId: string, answer: string): void {
    if(questionId && answer) {
      this.socket.send(answer);
    }
  }

}
