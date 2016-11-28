import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  constructor (private http: Http ) { }

  private _url = 'http://localhost:3000';
  private _isAuth = this._url+'/api/user/checkAuth'

  isLoggedIn() {
    return this.http.get(this._isAuth, {withCredentials:true})
      .map( response => response.json())
      .catch(this.handleError);
  }



  private handleError (err: Response) {
    console.log(err);
    return Observable.throw(err || "Server Error");
  }
}
