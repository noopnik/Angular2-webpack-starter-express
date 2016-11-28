import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../shared/services/user/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MainComponentGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) { }

  canActivate() {
    return this._userService.isLoggedIn()
      .map( result => {
        console.log(result);
        if (result.user) {
          return true;
        } else {
          this._router.navigate(['/login'])
          return false;
        }
      }).catch( err => {
        console.log(err);
        this._router.navigate(['/login'])
        return Observable.of(false);
      });
  }
}