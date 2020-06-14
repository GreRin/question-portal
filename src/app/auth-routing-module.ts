import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDetailsComponent } from './components/user-profile/user-details.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { QuestionComponent } from './components/question/question.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import { AuthGuard } from './common/services/auth/auth.guard';

const routes: Routes = [
		{ path: 'user-profile', component: UserDetailsComponent, pathMatch: 'full' },
		{ path: 'main', component: MainPageComponent, canActivate: [AuthGuard], pathMatch: 'full' },
		{ path: 'main/:id', component: QuestionComponent, pathMatch: 'full' },
    { path: '', redirectTo: '/main', canActivate: [AuthGuard], pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
