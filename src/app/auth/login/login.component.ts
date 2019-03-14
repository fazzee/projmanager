import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  isLoading = false;
  private authSub: Subscription;

  constructor(private authService: AuthService, private router: Router){}


   ngOnInit(){
     this.authSub = this.authService.getAuthStatusListener()
     .subscribe(authStatus =>{
       this.isLoading = false;
     });
   }

   onSignin(form: NgForm){
     if(form.invalid){
       return;
     }
     this.isLoading = true;
    this.authService.loginUser(form.value.email, form.value.password);

   }

   ngOnDestroy(){
     this.authSub.unsubscribe();
   }
}
