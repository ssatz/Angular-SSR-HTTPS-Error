/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { Component, OnInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import * as Ps from 'perfect-scrollbar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from '../../models/user-profile.model';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ValidationService } from '../../shared/service/validation.service';
import { User } from '../../models/user.model';
import { UserService } from '../../shared/service/user.service';
import { isNull } from 'util';
import { ToastService, ToastNotificationColor } from '../../shared/service/toast.service';
import { LanguageService } from '../../shared/service/language.service';
import { Password } from '../../models/password.model';
import { FormError } from '../../models/form-error.model';
import { MaterializeAction } from 'angular2-materialize';
import { BankAccountDetails } from '../../models/bank-details.model';
import { LaddaButtonSpinnerService } from '../../shared/service/LaddaButtonSpinnerService';
import { SeoService, MetaTagsForPages } from '../../shared/service/seo.service';


@Component({
    selector: 'profile-cmp',
    styles: ['.select-dropdown{ left:45px !important; width: 87% !important;}#sms-modal{top:30%!important;}'],
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit, OnDestroy {
    public userProfile: UserProfile;
    public userDetailsForm: FormGroup;
    public bankForm: FormGroup;
    public BankName: any;
    public passwordForm: FormGroup;
    public formBuilder: FormBuilder;
    public submitted = false;
    private userService: UserService;
    smsModal = new EventEmitter<string | MaterializeAction>();

    constructor(private activatedRoute: ActivatedRoute,
        formBuilder: FormBuilder,
        userService: UserService,
        private seoService: SeoService,
        private toastService: ToastService,
        private langService: LanguageService,
        private ladda: LaddaButtonSpinnerService,
        private elRef: ElementRef) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.userProfile = this.activatedRoute.snapshot.data['userProfileData'];
    }


    ngOnInit() {
        this.seoService.setTitle('Profile Update - Paisaclub.com Mobile Recharge, Bill Payments, DTH Recharge, Datacard Topup & Cashback');
        this.seoService.setMetaTag(MetaTagsForPages.DESCRIPTION,
            'Mobile Recharge, Bill Payments, DTH Recharge, Datacard Topup & Cashback- Airtel');
        this.seoService.setMetaTag(MetaTagsForPages.KEYWORDS, 'mobile recharge, cashback, airtel, jio, mts, BSNL, topup, free recharge');
        this.ladda.create();
        const container = document.getElementsByClassName('card-reveal');
        for (let x = 0; x < container.length; x++) {
            Ps.initialize(document.getElementById(container[x].id));
        }
        Ps.initialize(document.getElementById('sms-modal'));

        this.userDetailsForm = this.formBuilder.group({
            name: ['', [<any>Validators.required, ValidationService.stringValidator]],
            mobile: ['', [<any>Validators.required, ValidationService.mobileValidator]],
            DOB: ['', [<any>Validators.required]],
        });

        this.bankForm = this.formBuilder.group({
            AccountHolderName: ['', [<any>Validators.required, ValidationService.stringValidator]],
            AccountNumberGroup: this.formBuilder.group({
                AccountNumber: ['', [<any>Validators.required, ValidationService.accountNumberValidator]],
                ConfirmAccountNumber: ['', [<any>Validators.required, ValidationService.accountNumberValidator]]
            }, { validator: ValidationService.accountNumberConfirmValidator }),
            BankName: ['', [<any>Validators.required]],
            Branch: ['', [<any>Validators.required, ValidationService.stringValidator]],
            IFSC_Code: ['', [<any>Validators.required, ValidationService.IFSCValidator]]
        });

        this.passwordForm = this.formBuilder.group({
            current_password: ['', [<any>Validators.required]],
            password_group: this.formBuilder.group({
                password: ['', [<any>Validators.required]],
                confirm_password: ['', [<any>Validators.required]]
            }, { validator: ValidationService.passwordConfirmValidator }),
        });
    }

    selectBank(bankID: number) {
        this.userProfile.bank.BankId = bankID;
    }

    updateUserDetails(user: User, isValid: boolean) {
        this.userDetailsForm.get('name').markAsTouched();
        this.userDetailsForm.get('mobile').markAsTouched();
        this.userDetailsForm.get('DOB').markAsTouched();

        user.id = this.userProfile.user.id;
        /*to update the user details based on id */
        if (isValid) {
            this.ladda.start();
            this.userService.updateUserProfile(user).subscribe((data) => {
                if (data.status === true) {
                    this.userProfile.user = data.user;
                    this.closeCardReveal('#user-close');
                    this.toastService.showToast(this.langService.TOAST_UPDATE_SUCCESS);
                    this.ladda.stop();
                    return;
                }

                ValidationService.remoteValidation(data.user, this.userDetailsForm);
                this.toastService.showToast(this.langService.TOAST_UPDATE_FAILED);
                this.ladda.stop();
            });
        }
    }

    /* Create/ Update Bank Account Details */
    cuBankDetails(bankDetails: BankAccountDetails, isValid: boolean) {
        bankDetails.id = this.userProfile.bank.id;
        /*to update the user details based on id */
        for (const propertyName in this.bankForm.controls) {
            if (propertyName) {
                this.bankForm.get(propertyName).markAsTouched();
            }

        }
        this.bankForm.get('AccountNumberGroup').get('AccountNumber').markAsTouched();
        this.bankForm.get('AccountNumberGroup').get('ConfirmAccountNumber').markAsTouched();
        bankDetails.BankId = this.userProfile.bank.BankId;
        bankDetails.AccountNumber = bankDetails.AccountNumberGroup.AccountNumber;
        bankDetails.AccountNumber_confirmation = bankDetails.AccountNumberGroup.ConfirmAccountNumber;
        if (isValid) {
            this.ladda.start();
            this.userService.createOrUpdateBankDetails(bankDetails).subscribe((data) => {
                if (data.status === true) {
                    this.userProfile.bank = data.bank;
                    this.closeCardReveal('#bank-close');
                    this.toastService.showToast(this.langService.TOAST_UPDATE_SUCCESS);
                    this.ladda.stop();
                    return;
                }

                ValidationService.remoteValidation(data.bank, this.bankForm);
                this.toastService.showToast(this.langService.TOAST_UPDATE_FAILED);
                this.ladda.stop();
            });
        }
    }

    submitPasswordChange($password: any, isValid: boolean, event: Event) {
        event.preventDefault();
        this.submitted = true;
        this.passwordForm.get('current_password').markAsTouched();
        this.passwordForm.get('password_group').get('password').markAsTouched();
        this.passwordForm.get('password_group').get('confirm_password').markAsTouched();
        if (isValid) {
            this.ladda.start();
            const password: Password = new Password($password);
            this.userService.profilePasswordChange(password).subscribe((data) => {
                if (data.status === true) {
                    this.toastService.showToast(this.langService.TOAST_UPDATE_SUCCESS);
                    this.ladda.stop();
                    return;
                }

                ValidationService.remoteValidation(data.password, this.passwordForm);
                this.toastService.showToast(this.langService.TOAST_UPDATE_FAILED);
                this.ladda.stop();
            });
        }
    }

    formErrors(): FormError[] {
        if (this.submitted && this.passwordForm.errors) {
            return ValidationService.getErrors(this.passwordForm);
        }
    }

    openSMSModal($event) {
        $event.preventDefault();
        this.sendCode();
        this.smsModal.emit({ action: 'modal', params: ['open'] });
    }

    verifyMobile(form: NgForm) {
        if (form.submitted && form.valid && !form.errors) {
            this.userService.verifyMobile(form.value).subscribe((data) => {
                this.userProfile.user = data.user as User;
                if (!data.status) {
                    this.toastService.showToast('Please Provide a Valid Code to verify mobile',
                        ToastNotificationColor.ERROR);
                    return;
                }
                this.toastService.showToast('Your Mobile Verified Successfully');
                this.smsModal.emit({ action: 'modal', params: ['close'] });
            });
        }
    }

    resendCode($event) {
        $event.preventDefault();
        this.sendCode();
    }

    sendCode() {
        this.userService.issueCodeverifyMobile().subscribe((data) => {
            if (data['status'] === true) {
                this.toastService.showToast(data['message'], ToastNotificationColor.SUCCESS);
            } else {
                this.toastService.showToast(data['message'], ToastNotificationColor.ERROR);
            }

        });
    }

    private nullCheck(data: any) {
        if (isNull(data)) {
            return '';
        }
        return data;
    }

    /* Close the CardReveal  */
    private closeCardReveal($id: string) {
        (this.elRef.nativeElement.querySelector($id) as HTMLElement).click();
    }

    ngOnDestroy() {
        this.smsModal.emit({ action: 'modal', params: ['close'] });
    }
}
