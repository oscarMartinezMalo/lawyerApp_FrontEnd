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
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResetPassowrdComponent } from './reset-passowrd/reset-passowrd.component';
import { ForgotPasswordTokenComponent } from './forgot-password-token/forgot-password-token.component';
import { ConfirmValidatorDirective } from './confirm-validator.directive';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from '../shared/services/auth-guard.service';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ForgotPassComponent,
    UpdateUserComponent,
    ProfileComponent,
    ResetPassowrdComponent,
    ForgotPasswordTokenComponent,
    ConfirmValidatorDirective
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    MatProgressBarModule,
    RouterModule.forChild([
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'reset-password', component: ResetPassowrdComponent, canActivate: [AuthGuard] },
      { path: 'forgot-password', component: ForgotPassComponent },      
      { path: 'forgot-password-token', component: ForgotPasswordTokenComponent }
      // { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] },
    ])
  ]
})
export class AuthModule { }
