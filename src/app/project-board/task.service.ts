import { Injectable } from "@angular/core";
import { Tasks } from './task.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({providedIn : 'root'})
export class TaskService{

private tasks : Tasks[] = [];
private tasksupdated = new Subject<task: Tasks[]>();

constructor(private http: HttpClient){}

getUpdatedTaskListener(){
  return this.tasksupdated.asObservable();
}

getTasks(){
  this.http.get<{message: string, tasks: any}> ("http://localhost:3000/api/tasks")
  .pipe(map((taskData) => {
    return {task: taskData.tasks.map(task => {
      return {
        id: task._id,
        name: task.name,
        taskIndex: task.taskIndex,
        assosiatedProject: task.assosiatedProject,
        board: task.board
      };
    })
  };
  console.log(taskData);
  }))
  .subscribe(transformedTasksData =>{
    this.tasks = transformedTasksData.tasks;
    return this.tasksUpdated.next({task: [...this.tasks]});
  });
}


addTask(name: string, taskIndex: number, assosiatedProject: string, board: string){

  const taskData = {
    name: name,
    taskIndex: taskIndex,
    assosiatedProject: assosiatedProject,
    board: board
  };

  this.http.post<{message: string, task: Tasks}>("http://localhost:3000/api/tasks", taskData)
  .subscribe(response => {
    console.log(response);
  });
}



getTask(id: string){
  return this.http.get<{
    _id: string,
    name: string,
    taskIndex: number,
    assosiatedProject: string,
    board: string
  }>("http://localhost:3000/api/tasks/" + id);
}



updateTask(id: string,
  name: string,
  taskIndex: number,
  assosiatedProject: string,
  board: string){

    const taskData = {
      id: id,
      name: name,
      taskIndex: taskIndex,
      assosiatedProject: assosiatedProject,
      board: board
    }


    this.http.put("http://localhost:3000/api/tasks/" + id, taskData)
    .subscribe(response => {
      console.log(response);
    });

}


deleteTask(id: string){
  return this.http.delete("http://localhost:3000/api/tasks/" + id);
}
}
