import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../admin.guard';
import { AuthGuard } from '../auth.guard';
import { GestionComponent } from './gestion.component';
import { LogsComponent } from './logs/logs.component';
import { TracesComponent } from './traces/traces.component';
import { UploadComponent } from './upload/upload.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{ path: '', component: GestionComponent,
children : [
  { path: 'users', component: UsersComponent , canActivate : [AdminGuard,AuthGuard] },
{ path: 'traces', component: TracesComponent ,canActivate:[AuthGuard]},
{ path: 'upload', component: UploadComponent ,canActivate:[AuthGuard]},
{ path: 'user-profile', component: UserProfileComponent ,canActivate:[AuthGuard]},
{ path: 'logs', component: LogsComponent ,canActivate:[AuthGuard , AdminGuard]},


{ path: '**', component: TracesComponent },
]

},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
