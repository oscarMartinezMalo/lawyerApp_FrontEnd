import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { RoleListComponent } from './components/role-list/role-list.component';
import { MaterialModulesModule } from '../material-modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { UserFormComponent } from './components/user-form/user-form.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { RoleAddDeleteUserComponent } from './components/role-add-delete-user/role-add-delete-user.component';


@NgModule({
  declarations: [UserListComponent, RoleListComponent, RoleFormComponent, RoleAddDeleteUserComponent],
  imports: [
    CommonModule,
    MaterialModulesModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'roles', component: RoleListComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },      
      { path: 'addUsersToRole', component: RoleAddDeleteUserComponent, canActivate: [AuthGuard] },      
      { path: "users/:id", component: UserFormComponent, canActivate: [AuthGuard]},
      { path: "roles/:id", component: RoleFormComponent, canActivate: [AuthGuard]},
      // { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] },
    ])
  ]
})
export class AdminModule { }
