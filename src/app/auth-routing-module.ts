import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDetailsComponent } from './components/user-profile/user-details.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { QuestionComponent } from './components/question/question.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

const routes: Routes = [
		{ path: 'user-profile', component: UserDetailsComponent },
		{ path: '', component: MainPageComponent },
		{ path: ':id', component: QuestionComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
