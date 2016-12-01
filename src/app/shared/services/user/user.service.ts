import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';


import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  private _url = 'http://localhost:3000';
  private _isAuth = this._url+'/api/user/checkAuth';

  constructor (
    private http: Http,
    private authHttp: AuthHttp,
    private router: Router
    ) { }

  loggedIn() {
    return tokenNotExpired();
  }

  login(credentials) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url+'/api/user/login', JSON.stringify(credentials), { headers })
      .map(res => res.json())
      .map( data => {
          if (data.success) {
            localStorage.setItem('id_token', data.token);
          }

          return data.success;

       },
        error => {
          console.log(error);
          return false;
        }
      );
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }

  sendData() {
    this.authHttp.get(this._url+'/api/user/protected')
      .map( res => res.json())
      .subscribe(
        data => console.log(data),
        error=> {
          if (error.statusText && error.statusText === 'Unauthorized') {
            this.router.navigate(['/login']);
          }
        }
       );
  }

  sendDataWrong() {
    this.authHttp.get(this._url+'/api/user/protected1')
      .map( res => res.json())
      .subscribe(
        data => console.log(data),
        error=> {
          console.log(error);
          if (error.statusText && error.statusText === 'Unauthorized') {
            localStorage.removeItem('id_token')
            this.router.navigate(['/login']);
          }
        }
       );
  }

  private handleError (err: Response) {
    console.log(err);
    return Observable.throw(err || "Server Error");
  }
}
