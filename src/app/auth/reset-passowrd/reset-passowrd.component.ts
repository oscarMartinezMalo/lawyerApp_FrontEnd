import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { WrongCredentialError } from 'src/app/shared/errors/wrong-crendential-error';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-passowrd',
  templateUrl: './reset-passowrd.component.html',
  styleUrls: ['./reset-passowrd.component.scss']
})
export class ResetPassowrdComponent implements OnInit {
  public progressBarMode = '';
  messageSuccess: string;
  messageError: string;
  formErrors: {code:string, description: string}[] = [];

  hidePassword = true;
  hideCurrentPassword = true;

  resetPasswordForm = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.minLength(4)]],
    newPassword: ['', [Validators.required, Validators.minLength(4)]],
    retypePassword: ['', [Validators.required, Validators.minLength(4)]],
  });
  
  constructor(    
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,    
    private router: Router,) { 
  }
  ngOnInit(): void { }

  async onSubmit() {  
    this.resetPasswordForm.get('currentPassword').markAsTouched();
    this.resetPasswordForm.get('newPassword').markAsTouched();
    this.resetPasswordForm.get('retypePassword').markAsTouched();
    this.messageSuccess = '';
    this.messageError ='';

    if (this.resetPasswordForm.valid && this.resetPasswordForm.touched) {
      this.progressBarMode = 'indeterminate';

      try {
        console.log(this.resetPasswordForm.value);
         await this.authService.resetPassword(this.resetPasswordForm.value);
         this.snackBar.open('Password successfully changed', 'X', { duration: 20000, panelClass: ['green-snackbar'] });
         this.router.navigate(['/signin']);
      } catch (error) {

        if (error instanceof WrongCredentialError) {
          this.snackBar.open('Token invalid, expired or wrong email', 'X', {duration: 20000, panelClass: ['red-snackbar'] });
         }

        this.snackBar.open('Something went wrong, password was not updated', 'X', {duration: 20000,panelClass: ['red-snackbar']});         
      } finally {
        this.progressBarMode = '';
      }
    }
  }
}
