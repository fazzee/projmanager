import { Component, OnInit, OnDestroy } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Tasks } from '../task.model';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from '../task.service';



@Component({
  selector: 'app-project-board-create',
  templateUrl: './pb-create.component.html',
  styleUrls: ['./pb-create.component.css']
})
export class ProjectBoardCreateComponent implements OnInit, OnDestroy{
  isLoading = false;
  userIsAuthenticated = false;
  tasks: Tasks[];


  // movies = [
  //   'Episode I - The Phantom Menace',
  //   'Episode II - Attack of the Clones',
  //   'Episode III - Revenge of the Sith',
  //   'Episode IV - A New Hope',
  //   'Episode V - The Empire Strikes Back',
  //   'Episode VI - Return of the Jedi',
  //   'Episode VII - The Force Awakens',
  //   'Episode VIII - The Last Jedi'
  // ];

 ngOnInit(){

 }

 ngOnDestroy(){

 }



drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
}
}


