import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { RoleListComponent } from './components/role-list/role-list.component';
import { MaterialModulesModule } from '../material-modules.module';

@NgModule({
  declarations: [UserListComponent, RoleListComponent],
  imports: [
    CommonModule,
    MaterialModulesModule,
    RouterModule.forChild([
      { path: 'roles', component: RoleListComponent },
      { path: 'users', component: UserListComponent },
      // { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] },
    ])
  ]
})
export class AdminModule { }
