import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent {

  public progressBarMode = '';
  hasUnitNumber = false;

  forgotPasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, this.emailValid()])],
  });

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      // private sharedService: SharedService
  ) { }

  async onSubmit() {
      if (this.forgotPasswordForm.valid && this.forgotPasswordForm.touched) {
          const email = this.forgotPasswordForm.get('email').value.trim();

          this.progressBarMode = 'indeterminate';
          try {
            await this.authService.forgotPassword(email);
            this.forgotPasswordForm.reset();  
            this.forgotPasswordForm.get('email').setErrors(null);             
          } catch (error) {
              
          } finally{
            this.progressBarMode = '';
          }
      }
  }

  emailValid() {
      return control => {
          // tslint:disable-next-line: max-line-length
          const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return regex.test(control.value) ? null : { invalidEmail: true };
      };
  }
}
