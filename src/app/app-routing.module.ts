import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, data: { animation: 'FadeOut' }
  },
  {
    path: 'login', component: LoginComponent,  data: { animation: 'FadeIn' }
  },
  {
    path: 'register', component: RegisterComponent,  data: { animation: 'FadeOut' }
  },
  {
    path: 'password-reset', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
