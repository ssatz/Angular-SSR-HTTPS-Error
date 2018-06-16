/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {Component, OnInit, NgZone, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from '../shared/service/validation.service';
import {UserService} from '../shared/service/user.service';
import {ToastService} from '../shared/service/toast.service';
import {LaddaButtonSpinnerService} from '../shared/service/LaddaButtonSpinnerService';
import {FormError} from '../models/form-error.model';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../shared/service/authentication.service';

@Component({
    selector: 'reset-pass-cmp',
    templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit,OnDestroy {
    private email: string;
    private token: any;
    public formBuilder: FormBuilder;
    public submitted: boolean = false;
    public resetPasswordForm: FormGroup;
    private subscription: Subscription = new Subscription();

    constructor(private router: Router,
                private authService: AuthenticationService,
                private zone: NgZone,
                private activatedRoute: ActivatedRoute,
                private userService: UserService,
                private laddaService: LaddaButtonSpinnerService,
                private toastService: ToastService,
                formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
        this.activatedRoute.params.subscribe((params: Params) => {
            this.email = params['email'];
            this.token = params['token'];
        });

    }

    ngOnInit() {
        this.subscription = this.authService.isAuthenticated.subscribe((auth: boolean) => {
            if (auth) {
                this.zone.run(() => {
                    this.router.navigate(['/myaccount/home'])
                });
            }
        });
        this.resetPasswordForm = this.formBuilder.group({
            email: [this.email, [<any>Validators.required, ValidationService.emailValidator]],
            password_group: this.formBuilder.group({
                password: ['', [<any>Validators.required]],
                confirm_password: ['', [<any>Validators.required]]
            }, {validator: ValidationService.passwordConfirmValidator}),
            token: [this.token]
        });
        this.laddaService.create('reset-pass-btn');
    }

    formErrors(): FormError[] {
        if (this.submitted && this.resetPasswordForm.errors) {
            return ValidationService.getErrors(this.resetPasswordForm);
        }
    }

    resetPassword(password, isValid: boolean) {
        this.resetPasswordForm.get('email').markAsTouched();
        this.resetPasswordForm.get('password_group').get('password').markAsTouched();
        this.resetPasswordForm.get('password_group').get('confirm_password').markAsTouched();
        let passwordDetails = {
            email: password.email,
            password: password.password_group.password,
            password_confirmation: password.password_group.confirm_password,
            token: password.token
        };
        this.submitted = true;
        if (isValid) {
            this.laddaService.start();
            this.userService.resetPassword(passwordDetails).subscribe((data: any) => {
                    if (data.status) {
                        this.toastService.showToast(data.message);
                        this.router.navigateByUrl('login');
                    }
                    ValidationService.remoteValidation(data, this.resetPasswordForm);
                    this.laddaService.stop();
                },
                (error) => {
                    ValidationService.remoteValidation(error, this.resetPasswordForm);
                    this.laddaService.stop();
                }
            );
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}