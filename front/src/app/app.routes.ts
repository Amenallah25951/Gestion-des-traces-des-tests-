import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, 
    { path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) },
    { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
    { path: 'gestion', loadChildren: () => import('./gestion/gestion.module').then(m => m.GestionModule), },
    { path: 'acceuil', loadChildren: () => import('./acceuil/acceuil.module').then(m => m.AcceuilModule) , canActivate:[AuthGuard]}, 
    { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: '**', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
