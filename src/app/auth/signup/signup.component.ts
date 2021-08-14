import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppError } from 'src/app/shared/errors/app-error';
import { WrongCredentialError } from 'src/app/shared/errors/wrong-crendential-error';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    public progressBarMode = '';
    hasUnitNumber = false;

    signUpForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z ']*")]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z ']*")]],
        email: ['', Validators.compose([Validators.required, this.emailValid()])],
        password: ['', [Validators.required, Validators.minLength(3)]]
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    async onSubmit() {
        if (this.signUpForm.valid && this.signUpForm.touched) {
            const firstName = this.signUpForm.get('firstName').value.trim();
            const lastName = this.signUpForm.get('lastName').value.trim();
            const email = this.signUpForm.get('email').value.trim();
            const password = this.signUpForm.get('password').value;

            this.progressBarMode = 'indeterminate';
            try {                
                await this.authService.signup({ firstName, lastName, email, password });
            } catch (error) {
                if (error instanceof WrongCredentialError) { 
                    this.signUpForm.setErrors({ userPass: true });
                 } else { throw error;  }
            }finally{
                this.progressBarMode = '';
            }
        }
    }

    emailValid() {
        return (control: { value: string; }) => {
            // tslint:disable-next-line: max-line-length
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(control.value) ? null : { invalidEmail: true };
        };
    }

}