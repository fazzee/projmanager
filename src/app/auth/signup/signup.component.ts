import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthData } from '../auth.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy{
  private authSub: Subscription;
  isLoading = false;

  constructor(public authService: AuthService){}

onSignup(form: NgForm){
  if(form.invalid){
    return;
  }

  this.authService.createUser(form.value.email,form.value.password);
}

ngOnInit(){
  this.authSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
    this.isLoading = false;
  })
}

ngOnDestroy(){
  this.authSub.unsubscribe();
}

}
