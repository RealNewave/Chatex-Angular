import {Routes} from "@angular/router";
import {MainViewComponent} from "./main-view/main-view/main-view.component";
import {QuestionDetailViewComponent} from "./question-detail-view/question-detail-view/question-detail-view.component";

export const routes: Routes = [
  {path:"", component: MainViewComponent},
  {path:":questionId", component: QuestionDetailViewComponent},
]


