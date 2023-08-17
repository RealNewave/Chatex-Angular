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

  connect(questionId: string, username: string):Observable<Answer> {
    this.socket = new WebSocket(`wss://chatex-quarkus.onrender.com/chat/questions/${questionId}/${username}`);
    return new Observable(observer =>{
      this.socket.onmessage = (event) => observer.next(JSON.parse(event.data));
      this.socket.onerror = (event) => observer.error(event);
      this.socket.onclose = () => observer.complete();
    });

  }

  disconnect(){
    this.socket.close();
  }

  answerQuestion(questionId: string, answer: string, username: string): void {
    if(questionId && answer && username) {
      this.socket.send(answer);
    }
  }

}

