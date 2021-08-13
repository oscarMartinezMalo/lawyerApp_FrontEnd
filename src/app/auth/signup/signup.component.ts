import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    public progressBarMode = '';
    hasUnitNumber = false;

    signUpForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z ']*")]],
        email: ['', Validators.compose([Validators.required, this.emailValid()])],
        password: ['', [Validators.required, Validators.minLength(3)]]
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    async onSubmit() {
        if (this.signUpForm.valid && this.signUpForm.touched) {
            const name = this.signUpForm.get('name').value.trim();
            const email = this.signUpForm.get('email').value.trim();
            const password = this.signUpForm.get('password').value;

            this.progressBarMode = 'indeterminate';
            await this.authService.signup({ name, email, password });
            this.progressBarMode = '';
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