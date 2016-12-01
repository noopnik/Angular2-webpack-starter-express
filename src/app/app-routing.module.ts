import { NgModule }  from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { LoginFormComponent } from './user/login';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { MainComponent } from './main'
import { NoContentComponent } from './no-content';

import { MainComponentGuard } from './main/main.guard'

const appRoutes: Routes = [
  { path: '',      component: MainComponent, canActivate: [MainComponentGuard],
    children: [
      { path: 'home',  component: HomeComponent },
      { path: 'about', component: AboutComponent },
      {
        path: 'detail', loadChildren: () => System.import('./+detail')
          .then((comp: any) => comp.default),
      },
    ]
   },
  { path: 'login', component: LoginFormComponent },
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