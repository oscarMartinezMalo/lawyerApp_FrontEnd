import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ProfileComponent } from './profile/profile.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { TeamsDropdownComponent } from 'src/app/shared/components/teams-dropdown/teams-dropdown.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ForgotPassComponent,
    UpdateUserComponent,
    ProfileComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    RouterModule.forChild([
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPassComponent },
      // { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] },
      // { path: 'forgot-password-token/:token', component: ForgotPasswordTokenComponent }
    ])
  ]
})
export class AuthModule { }
