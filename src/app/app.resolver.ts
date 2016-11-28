import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MainComponentGuard } from './main/main.guard'
import { UserService } from './shared/services/user/user.service'

@Injectable()
export class DataResolver implements Resolve<any> {
  constructor() {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return Observable.of({ res: 'I am data'});
  }
}

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
  DataResolver,
  MainComponentGuard,
  UserService
];
