import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Projects } from '../project.model';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit, OnDestroy{

  project: Projects;
  form: FormGroup;
  private projectId: string;
  private mode = "create";
  isLoading = false;
  private authStatusSub: Subscription;


  constructor(public projectService: ProjectService,
    public route: ActivatedRoute,
    private authService: AuthService){}




  ngOnInit(){

     this.authStatusSub = this.authService.getAuthStatusListener()
     .subscribe(authStatus => {
       this.isLoading = false;
     });


    this.form = new FormGroup({
      title: new FormControl(null,
        {validators : [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null,
        {validators : [Validators.required]
      }),
      addedDate : new FormControl(null,
        {validators: [Validators.required]})
    });


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('projectId')){
        this.mode = 'edit';
        this.projectId = paramMap.get("projectId");
        this.projectService.getProject(this.projectId).subscribe(projectData =>{
          this.isLoading =false;
          this.project = {
           id: projectData._id,
           title: projectData.title,
           description: projectData.description,
           addedDate: projectData.addedDate,
           creator: projectData.creator
          };
          this.form.setValue({
            title: this.project.title,
            description: this.project.description,
            addedDate: this.project.addedDate
          })
        });

      }
      else{
        this.mode = "create";
        this.projectId = null;
      }
    });



  }

  onSaveProject(){


   if(this.form.invalid){
     return;
   }

   if(this.mode === "create"){
   this.projectService.addProject(this.form.value.title,
     this.form.value.description,
     this.form.value.addedDate);
   }
   else{
   this.projectService.updateProject(this.projectId,
    this.form.value.title,
    this.form.value.description,
    this.form.value.addedDate);
   }
   this.form.reset();
  }

ngOnDestroy(){
  this.authStatusSub.unsubscribe();
}

}
