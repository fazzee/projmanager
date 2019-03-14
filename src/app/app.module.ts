import { ProjectBoardCreateComponent } from './project-board/project-board-create/pb-create.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ProjectListComponent } from './projects/project-list/project-list.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


//Angular Material CDK Modules

import {DragDropModule} from '@angular/cdk/drag-drop';


// Angular Material Modules

import {MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatChipsModule} from '@angular/material';

// Custom Component

import { HeaderComponent } from './header/header.component';
import {ProjectCreateComponent} from './projects/project-create/project-create.component';
import {LoginComponent} from './auth/login/login.component';
import {SignUpComponent} from './auth/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectCreateComponent,
    ProjectListComponent,
    ProjectBoardCreateComponent,
    SignUpComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    DragDropModule,
    BrowserAnimationsModule,
    HttpClientModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
