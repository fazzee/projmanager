import { Injectable } from '@angular/core';
import { Projects } from './project.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({providedIn : 'root'})
export class ProjectService{
private projects : Projects[] = [];
private projectUpdated = new Subject<{project: Projects[]}>();

constructor(private http: HttpClient){}

getProjectUpdateListener(){
  return this.projectUpdated.asObservable();
}

getProjects(){
  this.http.get<{message: string, projects: any}>
  ("http://localhost:3000/api/projects")
  .pipe(map((projectData) => {
    return {projects: projectData.projects.map(project =>{
      return{
       id: project._id,
       title: project.title,
       description: project.description,
       addedDate: project.addedDate,
       creator: project.creator
      };
    })
    };
    console.log(projectData);
  }))
  .subscribe((transformedProjectData) =>{
    this.projects = transformedProjectData.projects;
    return this.projectUpdated.next({project : [...this.projects]});
  });
}

addProject(title: string, description: string, addedDate: string){


const projectData = {
  title: title,
  description: description,
  addedDate: addedDate,
  creator: null
 };

this.http.post<{message: string, project: Projects}>("http://localhost:3000/api/projects", projectData)
.subscribe(response => {
  console.log(response);
});
}


getProject(id: string){
 return this.http.get<{
   _id: string;
   title: string;
   description: string;
   addedDate: string;
   creator: string;
 }>("http://localhost:3000/api/projects/" + id);
}


updateProject(id: string,
   title: string,
    description: string,
    addedDate: string){

  const projectData = {
    id: id,
    title: title,
    description: description,
    addedDate: addedDate
  };
this.http.put("http://localhost:3000/api/projects/" + id, projectData)
.subscribe(response => {
   console.log(response);
});

}

deleteProject(id: string){
      return this.http.delete("http://localhost:3000/api/projects/" + id);
    }
}
