import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuard } from './guard/security.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WorkspaceComponent } from './workspace/workspace.component';


const routes: Routes = [
  {
    path: 'workspace',
    component:WorkspaceComponent,
    loadChildren: () => import('./workspace/workspace.module').then((m) => m.WorkspaceModule),
    canActivate:[SecurityGuard],
    data:{
      role: 'admin'
    }
  },
  {

    path: "login",
    component:LoginComponent,
    title: "Login",

  },
  {
    path: "",
    component:LoginComponent,
    title: "Login",
    
  }
  ,
  { path: '',   redirectTo: '/first-component', pathMatch: 'full' },
   { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
