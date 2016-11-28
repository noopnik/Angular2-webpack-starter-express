import { NgModule }             from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './user/login';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { MainComponent } from './main'
import { NoContentComponent } from './no-content';

import { MainComponentGuard } from './main/main.guard'

const appRoutes: Routes = [
  { path: '',      component: MainComponent, canActivate: [MainComponentGuard],
    children: [{
      path: '',
      children: [
      { path: 'home',  component: HomeComponent },
      { path: 'about', component: AboutComponent },
      ]
    }]
   },
  { path: 'login', component: LoginComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
      .then((comp: any) => comp.default),
  },
  { path: '**',    component: NoContentComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}