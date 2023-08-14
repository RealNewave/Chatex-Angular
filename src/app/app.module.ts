import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MainViewComponent} from './main-view/main-view/main-view.component';
import {LoginComponent} from './modal/login/login.component';
import {QuestionDetailViewComponent} from './question-detail-view/question-detail-view/question-detail-view.component';
import {SubjectCardComponent} from './main-view/subject-card/subject-card.component';
import {RouterLink, RouterModule} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {NewQuestionComponent} from './modal/new-question/new-question.component';
import {MessageViewComponent} from './question-detail-view/message-view/message-view.component';
import {routes} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./service/AuthInterceptor";
import {ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import {PickerComponent} from "@ctrl/ngx-emoji-mart";
import {CloseQuestionComponent} from "./modal/close-question/close-question.component";

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    LoginComponent,
    QuestionDetailViewComponent,
    SubjectCardComponent,
    NewQuestionComponent,
    MessageViewComponent,
    NavbarComponent,
    ProfileComponent,
    CloseQuestionComponent
  ],
  imports: [
    BrowserModule,
    RouterLink,
    NgOptimizedImage,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    PickerComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
