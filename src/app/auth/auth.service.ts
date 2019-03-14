import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './auth.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';


@Injectable({providedIn : 'root'})
export class AuthService{

  private authStatus = new Subject<boolean>();
  private token: string;
  private isAuthenticated = false;
  private userId: string;
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router){}

  getToken(){
    return this.token;
  }

  getAuthStatus(){
    return this.isAuthenticated;
  }

  getUserId(){
    return this.userId;
  }

  getAuthStatusListener(){
    return this.authStatus.asObservable();
  }

  createUser(email: string, password: string){
    const authData: AuthData ={
      email: email,
      password: password
    }
    this.http.post("http://localhost:3000/api/members/signup", authData)
    .subscribe(() => {
      this.router.navigate["/"];
    }, error => {
      this.authStatus.next(false);
    });
  }

  loginUser(email: string, password: string){
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http.post<{token: string; expiresIn: number; userId: string}>
    ("http://localhost:3000/api/members/login", authData)
    .subscribe(response => {
      const token = response.token;
      this.token = response.token;
      if(token){
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatus.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, this.userId);
        this.router.navigate(['/']);
      }

    }, error =>{
      this.authStatus.next(false);
    });
  }




  logout(){
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatus.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);

  }

  autoAuthUser(){
    const authInformation = this.getAutoAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatus.next(true);
    }

  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
   }

  private saveAuthData(token: string, expirationDate: Date, userId: string){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData(){
   localStorage.removeItem("token");
   localStorage.removeItem("expiration");
   localStorage.removeItem("userId");
  }

  private getAutoAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");

    if(!token || !expirationDate){
     return;
    }

    return{
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

}
