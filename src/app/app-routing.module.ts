// core
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
// component
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(module => module.DashboardModule)
  },
  {
    path: '**', component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
