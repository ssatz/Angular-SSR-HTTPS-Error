

/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {
    Component, OnDestroy, OnInit, EventEmitter, Renderer2, ViewChild, ElementRef
} from '@angular/core';
import {CommonNotificationService} from '../service/common-notification.service';
import {Subscription} from 'rxjs';
import {MaterializeAction} from 'angular2-materialize';
import {AuthenticationService} from '../service/authentication.service';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import {ValidationService} from '../service/validation.service';
import {isNull} from 'util';
import {LaddaButtonSpinnerService} from '../service/LaddaButtonSpinnerService';
import {ToastService, ToastNotificationColor} from '../service/toast.service';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
    selector : 'login-modal-cmp',
    templateUrl : './login-modal.component.html',
    styles:[`
        .divider{margin-bottom:15px;}
        .terms{font-size: 10px;}
        .modal-min{min-height: 30% !important;}
        input:-webkit-autofill {-webkit-box-shadow: 0 0 0px 1000px #23334F  inset; 
        -webkit-text-fill-color: white !important;}
         input:-webkit-autofill:hover {-webkit-box-shadow: 0 0 0px 1000px #23334F  inset; 
         -webkit-text-fill-color: white !important;}
         input:-webkit-autofill:focus {-webkit-box-shadow: 0 0 0px 1000px #23334F  inset;
          -webkit-text-fill-color: white !important;}
        .progress{ margin:0px;}
        .login-bg{
        top:14% !important;
        max-width: 500px !important;
        color:#FFFFFF;
        background: #233241;
        background: -moz-linear-gradient(-45deg,#233241 0,#1f3760 100%);
        background: -webkit-linear-gradient(-45deg,#233241 0,#1f3760 100%);
        background: linear-gradient(135deg,#233241 0,#1f3760 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#233241', endColorstr='#1f3760', GradientType=1 );}`]
})
export class LoginModalComponent implements OnDestroy,OnInit{
    private subscription: Subscription;
    public loginFormModal: FormGroup;
    public progressBar:boolean =false;
    public isRegister:boolean=false;
    loginActions = new EventEmitter<string|MaterializeAction>();
    @ViewChild('loginFormEl') loginFormEl:ElementRef;
    public constructor( private notificationService: CommonNotificationService,
                        private ladda:LaddaButtonSpinnerService,
                        private route:Router,
                        private toastNotification: ToastService,
                        private renderer2:Renderer2,
                        private formBuilder: FormBuilder,
                        private authService:AuthenticationService){

    }
    ngOnInit(){
        this.ladda.progressBar.asObservable().subscribe((data:boolean) => {
            this.progressBar= data
        });
        this.loginFormModal =this.formBuilder.group({
            email    :       ['', [<any>Validators.required, ValidationService.emailValidator]],
            password    :       ['', [<any>Validators.required]]
        });
        this.subscription = this.notificationService.notifyObservable$.subscribe((res) => {
            if (res.hasOwnProperty('option') && res.option === 'login') {
                if(res.value==='open'){
                    this.progressBar = false;
                    this.isRegister = false;
                    if(res.register===true){
                        this.isRegister = true;
                    }
                    this.openModal();
                    return;
                }
                this.closeModal(res.event);
            }
        });
    }

    onSubmit($form:NgForm):void{
        this.ladda.create('login-form-btn');
        this.loginFormModal.get('email').markAsTouched();
        this.loginFormModal.get('password').markAsTouched();
        if($form.valid && isNull($form.errors)){
            this.ladda.start();
            let userModel = $form.value;
            this.authService.login(userModel.email, userModel.password)
                .subscribe( (result: boolean) => {
                        if (result === true) {
                            this.closeModal(new Event('click'));
                            this.ladda.stop();
                            this.ladda.remove();
                            if(this.route.url != '/recharge-bill-payment') {
                                if( this.route.url != '/offers') {
                                    this.route.navigate(['/myaccount/home']);
                                }
                            }
                            return;
                            } else {
                            this.ladda.stop();
                            this.ladda.remove();
                            return;
                        }
                    }, (error: any) => {
                        if (error.status === 400) {
                            this.toastNotification.showToast(error.error,ToastNotificationColor.ERROR);
                            this.ladda.stop();
                            this.ladda.remove();
                        } else {
                            this.toastNotification.showToast('Server Error, Please try again Sometime later',ToastNotificationColor.ERROR);
                            this.ladda.stop();
                            this.ladda.remove();
                        }
                    }
                );
        }
    }

    private resetForm(){
        this.loginFormModal.get('email').markAsUntouched();
        this.loginFormModal.get('password').markAsUntouched();
        this.loginFormModal.clearAsyncValidators();
        this.loginFormModal.clearValidators();
        this.loginFormModal.reset();
        let $element:HTMLElement[] = this.loginFormEl.nativeElement.querySelectorAll('label.active');
        for(let selector  in $element){
            if(!isNullOrUndefined($element[selector].className)){
                this.renderer2.removeClass($element[selector], 'active');
            }
        }
    }

    progressBarEvent(value:boolean){
        this.progressBar = value;
    }

    closeModal($event:any):void{
        if(!this.isRegister) {
            this.resetForm();
        }
        $event.preventDefault();
        this.loginActions.emit({action:"modal",params:['close']});
    }
    openModal():void{
        this.loginActions.emit({action:"modal",params:['open']});
    }
    ngOnDestroy(){
        this.loginActions.emit({action:"modal",params:['close']});
        this.subscription.unsubscribe();
    }
}