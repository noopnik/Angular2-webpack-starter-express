import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../shared/services/user/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MainComponentGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate() {
    if (this.userService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }

  }

}