/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Component, OnInit, NgZone, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../shared/service/validation.service';
import {UserService} from '../shared/service/user.service';
import {ToastService} from '../shared/service/toast.service';
import {SeoService, MetaTagsForPages} from '../shared/service/seo.service';
import {LaddaButtonSpinnerService} from '../shared/service/LaddaButtonSpinnerService';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../shared/service/authentication.service';


@Component({
    selector: 'forgotpass-cmp',
    templateUrl: './forgotpassword.component.html',
    styles:['.ladda-button{padding: 0px 30px;}']
})

export class ForgotPasswordComponent  implements OnInit,OnDestroy{

    public forgotPasswordForm:FormGroup;
    public formBuilder:FormBuilder;
    public submitted: boolean;
    private subscription: Subscription = new Subscription();
    constructor(private router:Router,
                private zone:NgZone,
                private authService:AuthenticationService,
                 formBuilder: FormBuilder,
                 private seoService:SeoService,
                 private userService:UserService,
                 private laddService:LaddaButtonSpinnerService,
                 private toastService:ToastService  ) {
        this.formBuilder = formBuilder;
        this.seoService.setTitle('ForgotPassword - Paisaclub.com Recharge Mobile & Much more');
        this.seoService.setMetaTag(MetaTagsForPages.DESCRIPTION,'Paisaclub.com - Forgot Password');
    }

    ngOnInit(){
        this.subscription = this.authService.isAuthenticated.subscribe((auth:boolean)=>{
            if(auth){
                this.zone.run(()=> {
                    this.router.navigate(['/myaccount/home'])
                });
            }
        });
        this.forgotPasswordForm = this.formBuilder.group({
            email : ['', [<any>Validators.required, ValidationService.emailValidator]],
        });
        this.laddService.create('forgot-pass-btn');
    }

    forgotPassword(email: string, isValid: boolean){
        this.forgotPasswordForm.controls['email'].markAsTouched();
        if(isValid){
            this.laddService.start();
            this.userService.forgotPassword(email).subscribe((data)=>{
                  if(data.status){
                    this.toastService.showToast(data.message);
                      this.laddService.stop();
                  }
                ValidationService.remoteValidation(data,this.forgotPasswordForm);
                this.laddService.stop();
            })
        }
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}


