import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../shared/service/validation.service';
import { User } from '../models/user.model';
import { AuthenticationService } from '../shared/service/authentication.service';
import { Router } from '@angular/router';
import { LaddaButtonSpinnerService } from '../shared/service/LaddaButtonSpinnerService';
import { Subscription } from 'rxjs';
declare let Materialize: any;

@Component({
    selector: 'login-cmp',
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit, OnDestroy {
    public fb: FormBuilder;
    public loginForm: FormGroup;
    public submitted: boolean;
    private authService: AuthenticationService;
    private subscription: Subscription = new Subscription();
    private router: Router;
    /* Remember Order of parameter is Important while calling super in Constructor */
    constructor(_router: Router,
        fb: FormBuilder,
        private zone: NgZone,
        authService: AuthenticationService,
        private ladda: LaddaButtonSpinnerService) {
        this.fb = fb;
        this.router = _router;
        this.authService = authService;
    }

    ngOnInit() {
        this.subscription = this.authService.isAuthenticated.subscribe((auth: boolean) => {
            if (auth) {
                this.zone.run(() => {
                    this.router.navigate(['/myaccount/home']);
                });
            }
        });
        this.loginForm = this.fb.group({
            email: ['', [<any>Validators.required, ValidationService.emailValidator]],
            password: ['', [<any>Validators.required]],
            // remember_me :    [ '' ]
        });
        this.ladda.create('login-submit');
    }

    loginUser(userModel: User, isValid: boolean) {
        this.loginForm.get('email').markAsTouched();
        this.loginForm.get('password').markAsTouched();
        if (isValid) {
            this.ladda.start();
            this.authService.login(userModel.email, userModel.password)
                .subscribe((result: boolean) => {
                    if (result === true) {
                        this.router.navigate(['/myaccount/home']);
                    } else {
                        this.ladda.stop();
                        Materialize.toast('Invalid Username Or Password', 2000);
                        return false;
                    }
                }, (error: HttpErrorResponse) => {
                    if (error.status === 400) {
                        Materialize.toast(error.error, 2000);
                        this.ladda.stop();
                    } else {
                        Materialize.toast('Server Error, Please try again Sometime later', 700);
                        this.ladda.stop();
                    }
                }
                );
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}


