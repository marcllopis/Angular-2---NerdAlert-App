import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class SessionService implements CanActivate {
  public token: string;
  isAuth: EventEmitter<any> = new EventEmitter();

	BASE_URL: string = 'http://localhost:3000';


  constructor(
    private router: Router,
    private ngZone: NgZone,
    private http: Http
  ) {
      // set token if saved in local storage
      this.token = localStorage.getItem('token');
      if (this.token != null) {
        this.isAuth.emit(true);
      } else {
        this.isAuth.emit(false);
      }
  }

  test() {
    this.http;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      // logged in so return true\
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    this.isAuth.emit(true);
    return false;
  }

  isAuthenticated() {
    return this.token != null ? true : false;
  }

  signup(user) {
    console.log(user)
  	return this.http.post(`${this.BASE_URL}/signup`, user)
  		.map((response) => response.json())
  		.map((response) => {
  			let token = response.token;
  			if (token) {
          // set token property
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', token );
          this.isAuth.emit(true);
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
  		})
  		.catch((err) => Observable.throw(err));
  }

  login(user) {
    return this.http.post(`${this.BASE_URL}/login`, user)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let token = response.json() && response.json().token;
            let user = JSON.stringify(response.json().user);
            if (token) {
              // set token property
              this.token = token;
              this.isAuth.emit(true);
              // store username and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', token );
              localStorage.setItem('user', user );

              // return true to indicate successful login
              return true;
            } else {
              // return false to indicate failed login
              return false;
            }
        });
  }

  logout() {
      // clear token remove user from local storage to log user out
      this.ngZone.run(()=>{
        this.token = null;
        this.isAuth.emit(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      })

  }
}
