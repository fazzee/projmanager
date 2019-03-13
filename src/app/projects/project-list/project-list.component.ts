import { AuthService } from './../../auth/auth.service';
import { ProjectService } from './../project.service';
import { Projects } from './../project.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit,OnDestroy{

  projects: Projects[];
  private projectSub: Subscription;
  projectId: string;
  isLoading = false;
  public userIsAuthenticated = false;
  userId: string;
  private authListenerSub: Subscription;


  constructor(public projectService: ProjectService, private authService: AuthService){}

  ngOnInit(){
   this.isLoading = true;
   this.projectService.getProjects();
   this.userId = this.authService.getUserId();

   this.projectSub= this.projectService.getProjectUpdateListener().subscribe((projectData: {project: Projects[]}) => {
    this.isLoading = false;
    this.projects = projectData.project;
   });


   this.userIsAuthenticated = this.authService.getAuthStatus();
   this.authListenerSub = this.authService.getAuthStatusListener()
   .subscribe(authStatus => {
      this.userIsAuthenticated = authStatus;
      this.userId = this.authService.getUserId();
   });

  }

  ngOnDestroy(){
    this.projectSub.unsubscribe();
    this.authListenerSub.unsubscribe();
  }

  onDeleteProject(projectId: string){
    this.isLoading =true;
   this.projectService.deleteProject(projectId).subscribe(() => {
     this.projectService.getProjects();
   });
  }

}
