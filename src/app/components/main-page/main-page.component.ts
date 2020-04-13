import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from '../../common/services/crud/crud.service';
import '@firebase/firestore'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

	id: number;
	color = '#f5f5f5';
	tiled = true;
	tiledToggle;
	row = "col-xl-12";
	users: Observable<any[]>;
	questions: Observable<any[]>;
	questionSnaption: [];

	constructor(
		private router: Router,
		public firestore: AngularFirestore,
		public crudService: CrudService,
	) {
		this.users = firestore.collection('users').valueChanges();
		this.questions = firestore.collection('newQuestion').snapshotChanges();
	}

  ngOnInit(): void {
		this.id = +this.firestore.collection('newQuestion').stateChanges;

	}

	deleteDataFromDatabase = () => {
		console.log("Deleted");
	}

	tiledRowToggle = () => {
		this.tiled = !this.tiled;
		this.tiled ? this.tiledToggle="col-sm-4 col-md-3 col-xl-2" : this.tiledToggle="col-sm-12 col-md-12 col-xl-12 card-row";
	}
	
	openMainPage = () => {
		this.router.navigate(['/']);
	}
}
