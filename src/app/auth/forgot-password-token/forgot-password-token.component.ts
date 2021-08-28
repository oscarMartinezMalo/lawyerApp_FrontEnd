import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppError } from 'src/app/shared/errors/app-error';
import { WrongCredentialError } from 'src/app/shared/errors/wrong-crendential-error';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConfirmValidatorDirective } from '../confirm-validator.directive';

@Component({
  selector: 'app-forgot-password-token',
  templateUrl: './forgot-password-token.component.html',
  styleUrls: ['./forgot-password-token.component.scss']
})
export class ForgotPasswordTokenComponent implements OnInit {
  public progressBarMode = '';
  messageSuccess: string;
  messageError: string;
  formErrors: {code:string, description: string}[] = [];
  forgotPasswordToken: string;

  resetPasswordForm = this.fb.group({
    email: ['', [Validators.required, this.emailValid()]],
    newPassword: ['', [Validators.required, Validators.minLength(4)]],
    retypePassword: ['', [Validators.required, Validators.minLength(4)]],
  });
  
  constructor(    
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService) { 
  }
  ngOnInit(): void {    
    this.forgotPasswordToken = this.route.snapshot.queryParamMap.get('token');
  }

  emailValid() {
    return control => {
        // tslint:disable-next-line: max-line-length
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(control.value) ? null : { invalidEmail: true };
    };
  }


  async onSubmit() {  
    this.resetPasswordForm.get('email').markAsTouched();
    this.resetPasswordForm.get('newPassword').markAsTouched();
    this.resetPasswordForm.get('retypePassword').markAsTouched();
    this.messageSuccess = '';
    this.messageError ='';

    if (this.resetPasswordForm.valid && this.resetPasswordForm.touched) {
      const email = this.resetPasswordForm.get('email').value.trim();
      const newPassword = this.resetPasswordForm.get('newPassword').value.trim();

      await this.authService.forgotPasswordToken(email, newPassword, this.forgotPasswordToken);
      // .subscribe(async resp => {        
      //   this.resetPasswordForm.get('newPassword').reset();
      //   this.resetPasswordForm.get('retypePassword').reset();
      //   this.messageSuccess = resp.message;
      // },
      // (error: AppError) => {
      //   if (error instanceof WrongCredentialError) { 
      //     this.messageError = 'Token invalid, expired or wrong email';
      //    } else {
      //      this.messageError = 'Something went wrong, password was not updated';
      //    }

      //    this.resetPasswordForm.get('newPassword').reset();
      //    this.resetPasswordForm.get('retypePassword').reset();
      // });
    }
  }
}
