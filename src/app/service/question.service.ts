import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Question} from "../domain/Question";


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  BASE_URL = "http://localhost:8080/api/v1";

  constructor(private httpClient: HttpClient) {
  }

  createQuestion(subject: string): Observable<Question> {
    return this.httpClient.post<Question>(this.BASE_URL + "/questions/", subject);
  }

  getQuestions(params: HttpParams): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.BASE_URL + "/questions", {params: params});
  }

  getQuestion(questionId: string): Observable<Question> {
    return this.httpClient.get<Question>(this.BASE_URL + "/questions/" + questionId);
  }

  login(username: string, password: string): Observable<void> {
    return this.httpClient.post<string>(this.BASE_URL + "/responders/login", {"username": username, password})
      .pipe(map(response => {
        localStorage.setItem("token", response);
        localStorage.setItem("username", username);
        return;
      }));
  }

  createResponder(username: string, password: string): Observable<void> {
    return this.httpClient.post<void>(this.BASE_URL + "/responders", {username, password});
  }
}