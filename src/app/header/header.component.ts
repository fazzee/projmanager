import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  userIsAuthenticated = false;
  private authStatusSub : Subscription;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus =>{
      this.userIsAuthenticated = authStatus;
    });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
