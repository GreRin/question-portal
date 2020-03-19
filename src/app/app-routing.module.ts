import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FormComponent } from './form/form.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
	{ path: '', component: HomePageComponent },
	{ path: 'form', component: FormComponent },
	{ path: 'about-us', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

 }
