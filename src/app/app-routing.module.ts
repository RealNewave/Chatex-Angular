import {Routes} from "@angular/router";
import {MainViewComponent} from "./main-view/main-view/main-view.component";
import {QuestionDetailViewComponent} from "./question-detail-view/question-detail-view/question-detail-view.component";
import {ProfileComponent} from "./profile/profile.component";

export const routes: Routes = [
  {path:"", component: MainViewComponent},
  {path:"question/:questionId", component: QuestionDetailViewComponent},
  {path:"profile", component: ProfileComponent},
]


