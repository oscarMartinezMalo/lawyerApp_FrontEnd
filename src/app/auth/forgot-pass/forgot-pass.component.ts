import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent {

  public progressBarMode = '';
  hasUnitNumber = false;

  signForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, this.emailValid()])],
  });

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      // private sharedService: SharedService
  ) { }

  async onSubmit() {
      if (this.signForm.valid && this.signForm.touched) {
          const email = this.signForm.get('email').value.trim();

          this.progressBarMode = 'indeterminate';
          await this.authService.forgotPassword(email);
          this.progressBarMode = '';
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
