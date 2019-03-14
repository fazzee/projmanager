import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import {SignUpComponent} from './auth/signup/signup.component';
import { ProjectBoardCreateComponent } from './project-board/project-board-create/pb-create.component';


const routes: Routes = [
  {
    path: '', component: ProjectListComponent
  },
  {
    path: 'create', component: ProjectCreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit/:projectId', component: ProjectCreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'board/:projectId', component: ProjectBoardCreateComponent, canActivate: [AuthGuard]
   }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule{

}
