/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */


import {map, pluck} from 'rxjs/operators';
import {
    Component, EventEmitter, OnInit, Renderer, OnDestroy, ElementRef, ViewChild, PLATFORM_ID, Inject,
} from "@angular/core";
import { MobileSimType } from '../helpers/EnumMobileSimType';
import { RechargeBillServices } from '../shared/service/recharge-bill.service';
import { OperatorCodes } from '../models/operator-codes.model';
import { Observable, Subscription } from 'rxjs';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../shared/service/validation.service';
import { ActivatedRoute } from '@angular/router';
import { OperatorsType } from '../models/operators-type';
import { MobilePlans } from '../models/mobile-plans.model';
import { CommonNotificationService } from '../shared/service/common-notification.service';
import { LaddaButtonSpinnerService } from '../shared/service/LaddaButtonSpinnerService';
import { AuthenticationService } from '../shared/service/authentication.service';
import { RechargeBillCategory } from '../helpers/EnumRechargeBillCategory';
import { isNullOrUndefined } from 'util';
import { ToastService, ToastNotificationColor } from '../shared/service/toast.service';
import { FormError } from '../models/form-error.model';
import { OperatorList } from "../models/operator-list.model";
import { SeoService, MetaTagsForPages } from '../shared/service/seo.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'recharge-cmp',
    templateUrl: './recharge-bill.component.html',
    styleUrls: ['./recharge-bill.component.scss'],
})

export class RechargeBillComponent implements OnInit, OnDestroy {
    public mobileSimType = MobileSimType;
    public operatorsType: Observable<OperatorsType>;
    public landLineOperators: OperatorCodes[];
    public dataCardOperators: OperatorCodes[];
    public dthOperators: OperatorCodes[];
    public rechargeForm: FormGroup;
    public landLineBillForm: FormGroup;
    public dataCardForm: FormGroup;
    public dthForm: FormGroup;
    public dataPlans: Array<MobilePlans>;
    public mobileOperatorsCode: OperatorCodes[];
    public mobileOperator: Observable<OperatorCodes>;
    public sideNavAction = new EventEmitter<string | MaterializeAction>();
    public isAuthenticated: boolean;
    public modalContent: any;
    public globalFormError: FormError[];
    selectAction = new EventEmitter<string | MaterializeAction>();
    private subscription: Subscription;
    @ViewChild('mobile') operatorFinderElement: ElementRef;
    @ViewChild('dataCardFormEl') dataCardFormEl: ElementRef;
    @ViewChild('mobileFormEl') mobileFormEl: ElementRef;
    @ViewChild('landLineFormEl') landLineFormEl: ElementRef;
    @ViewChild('dthFormEl') dthFormEl: ElementRef;
    public operatorList: OperatorList[];

    public constructor(private rechargeBillService: RechargeBillServices,
        private renderer: Renderer,
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: Object,
        private authService: AuthenticationService,
        private formBuilder: FormBuilder,
        private toastNotification: ToastService,
        private seoService: SeoService,
        private laddaService: LaddaButtonSpinnerService,
        private notificationService: CommonNotificationService,
        private activateRoute: ActivatedRoute) {
        this.operatorsType = this.activateRoute.data.pipe(pluck('rechargeBill'));
        this.prepareOperatorList();
    }

    ngOnInit() {
        this.seoService.setTitle('Mobile Recharge, Bill Payments, DTH Recharge, Datacard Topup & Cashback');
        this.seoService.setMetaTag(MetaTagsForPages.DESCRIPTION, 'Mobile Recharge, Bill Payments, DTH Recharge, Datacard Topup & Cashback- Airtel');
        this.seoService.setMetaTag(MetaTagsForPages.KEYWORDS, 'mobile recharge, cashback, airtel, jio, mts, BSNL, topup, free recharge');
        this.authService.isAuthenticated.subscribe((data: boolean) => {
            this.isAuthenticated = data;
        });
        this.operatorsType.pipe(
            map((data) => Object.keys(data).map(k => data[k]))) //convert object to array
            .subscribe((data) => {
                this.landLineOperators = Object.keys(data[0]).map(k => data[0][k]);
                this.dthOperators = Object.keys(data[1]).map(k => data[1][k]);
                this.dataCardOperators = Object.keys(data[2]).map(k => data[2][k]);
                this.mobileOperatorsCode = Object.keys(data[3]).map(k => data[3][k]);
            });
        this.rechargeForm = this.formBuilder.group({
            simType: [1, [<any>Validators.required]],
            mobileNumber: ['', [<any>Validators.required, ValidationService.mobileValidator]],
            mobileOperator: ['', [<any>Validators.required]],
            amount: ['', [<any>Validators.required, ValidationService.amountValidator]],
            rechargeBillCategory: [RechargeBillCategory.MOBILE]
        });


        this.landLineBillForm = this.formBuilder.group({
            landLineOperator: ['', [<any>Validators.required]],
            landLineAmount: ['', [<any>Validators.required, <any>ValidationService.amountValidator]],
            landLineStdCode: ['', [<any>Validators.required, <any>ValidationService.stdCodeValidator]],
            landLineTele: ['', [<any>Validators.required, <any>ValidationService.landLineValidator]],
            landLineCustNo: ['', [<any>Validators.required, <any>ValidationService.accountNumberValidator]],
            rechargeBillCategory: [RechargeBillCategory.LANDLINE]

        });


        this.dataCardForm = this.formBuilder.group({
            dataCardOperator: ['', [<any>Validators.required]],
            dataCardNumber: ['', [<any>Validators.required, ValidationService.mobileValidator]],
            dataCardAmount: ['', [<any>Validators.required, <any>ValidationService.amountValidator]],
            rechargeBillCategory: [RechargeBillCategory.DATACARD]
        });


        this.dthForm = this.formBuilder.group({
            dthOperator: ['', [<any>Validators.required]],
            dthNumber: ['', [<any>Validators.required, ValidationService.accountNumberValidator]],
            dthAmount: ['', [<any>Validators.required, <any>ValidationService.amountValidator]],
            rechargeBillCategory: [RechargeBillCategory.DTH]
        });

        this.subscription = this.notificationService.notifyObservable$.subscribe((res) => {
            this.sideNavAction.emit(res);
        });
        if (isPlatformBrowser(this.platformId)) {
            this.rechargeBillService.operatorFinderEvent(this.operatorFinderElement, 'keyup')
                .subscribe((data: any) => {
                    let prepaid: boolean = (this.rechargeForm.get('simType').value as MobileSimType === MobileSimType.PREPAID)
                        ? true : false;
                    let operator_code: string = prepaid ? data[0].prepaid_operator_code : data[0].postpaid_operator_code;

                    this.rechargeForm.get('mobileOperator').setValue(operator_code);
                    if (data[0].prepaid_operator_code != 'NAN') {
                        this.dataPlans = new Array;
                    }
                    if (prepaid && data[0].prepaid_operator_code != 'NAN') {
                        this.rechargeBillService.getOperatorsPlans(data[0].prepaid_operator_code, data[0].circle_code).pipe(
                            map((data) => Object.keys(data).map(k => data[k])))
                            .subscribe((data) => {
                                this.dataPlans = new Array;
                                for (let item in data) {
                                    for (let plan in data[item].offers) {
                                        this.dataPlans.push(data[item].offers[plan])
                                    }
                                }
                            });
                    }
                });
        }
    }


    rechargeFormSubmit(rechargeForm: FormGroup): void {
        this.laddaService.create('mobilebtn');
        this.globalFormError = [];
        if (!this.isAuthenticated) {
            this.notificationService.notifyOther({ option: 'login', value: 'open' });
            return;
        }
        for (let propertyName in this.rechargeForm.controls) {
            this.rechargeForm.get(propertyName).markAsTouched();
        }
        if (rechargeForm.valid && !rechargeForm.errors) {
            this.laddaService.start();
            let $object: Object = rechargeForm.value;
            this.rechargeBillService.rechargeBillService($object).subscribe((res: any) => {
                if (res.status && res.data.status === 'FAILED') {
                    if (res.data.detail) {
                        this.toastNotification.showToast(res.data.detail, ToastNotificationColor.ERROR);
                        this.laddaService.stop();
                        return;
                    }
                    ValidationService.remoteValidation(res.data, this.rechargeForm);
                    this.globalFormError = ValidationService.getErrors(this.rechargeForm);
                    this.laddaService.stop();
                    return;
                }
                for (let propertyName in this.rechargeForm.controls) {
                    this.rechargeForm.get(propertyName).markAsUntouched();
                }
                this.removeActiveClass(this.mobileFormEl);
                this.modal();
                this.modalContent = this.htmlGeneration(res.data);
                this.rechargeForm.reset();
                this.rechargeForm.get('rechargeBillCategory').setValue(RechargeBillCategory.MOBILE);
                this.rechargeForm.clearAsyncValidators();
                this.rechargeForm.clearValidators();
                this.laddaService.stop();
                return;
            },
                (error: any) => {
                    this.handleError(error);
                }
            );
        }

    }

    landLineFormSubmit(landLineForm: FormGroup): void {
        this.laddaService.create('landlinebtn');
        this.globalFormError = [];
        if (!this.isAuthenticated) {
            this.notificationService.notifyOther({ option: 'login', value: 'open' });
            return;
        }
        for (let propertyName in this.landLineBillForm.controls) {
            this.landLineBillForm.get(propertyName).markAsTouched();
        }
        if (landLineForm.valid && !landLineForm.errors) {
            this.laddaService.start();
            let $object: Object = landLineForm.value;
            this.rechargeBillService.rechargeBillService($object).subscribe((res: any) => {
                if (res.status && res.data.status === 'FAILED') {
                    if (res.data.detail) {
                        this.toastNotification.showToast(res.data.detail, ToastNotificationColor.ERROR);
                        this.laddaService.stop();
                        return;
                    }
                    ValidationService.remoteValidation(res.data, this.landLineBillForm);
                    this.globalFormError = ValidationService.getErrors(this.landLineBillForm);
                    this.laddaService.stop();
                    return;
                }
                for (let propertyName in this.landLineBillForm.controls) {
                    this.landLineBillForm.get(propertyName).markAsUntouched();
                }
                this.removeActiveClass(this.landLineFormEl);
                this.modal();
                this.modalContent = this.htmlGeneration(res.data);
                this.landLineBillForm.reset();
                this.landLineBillForm.get('rechargeBillCategory').setValue(RechargeBillCategory.LANDLINE);
                this.landLineBillForm.clearAsyncValidators();
                this.landLineBillForm.clearValidators();
                this.laddaService.stop();

            },
                (error: any) => {
                    this.handleError(error);
                }
            );
        }
    }

    dataCardFormSubmit(dataCardForm: FormGroup): void {
        this.laddaService.create('datacardbtn');
        this.globalFormError = [];
        if (!this.isAuthenticated) {
            this.notificationService.notifyOther({ option: 'login', value: 'open' });
            return;
        }
        for (let propertyName in this.dataCardForm.controls) {
            this.dataCardForm.get(propertyName).markAsTouched();
        }
        if (dataCardForm.valid && !dataCardForm.errors) {
            this.laddaService.start();
            let $object: Object = dataCardForm.value;
            this.rechargeBillService.rechargeBillService($object).subscribe((res: any) => {
                if (res.status && res.data.status === 'FAILED') {
                    if (res.data.detail) {
                        this.toastNotification.showToast(res.data.detail, ToastNotificationColor.ERROR);
                        this.laddaService.stop();
                        return;
                    }
                    ValidationService.remoteValidation(res.data, this.dataCardForm);
                    this.globalFormError = ValidationService.getErrors(this.dataCardForm);
                    this.laddaService.stop();
                    return;
                }
                for (let propertyName in this.dataCardForm.controls) {
                    this.dataCardForm.get(propertyName).markAsUntouched();
                }
                this.removeActiveClass(this.dataCardFormEl);
                this.modal();
                this.modalContent = this.htmlGeneration(res.data);
                this.dataCardForm.reset();
                this.dataCardForm.get('rechargeBillCategory').setValue(RechargeBillCategory.DATACARD);
                this.dataCardForm.clearAsyncValidators();
                this.dataCardForm.clearValidators();
                this.laddaService.stop();

            },
                (error: any) => {
                    this.handleError(error);
                }
            );
        }
    }

    dthFormSubmit(dthForm: FormGroup): void {
        this.laddaService.create('dthbtn');
        this.globalFormError = [];
        if (!this.isAuthenticated) {
            this.notificationService.notifyOther({ option: 'login', value: 'open' });
            return;
        }
        for (let propertyName in this.dthForm.controls) {
            this.dthForm.get(propertyName).markAsTouched();
        }
        if (dthForm.valid && !dthForm.errors) {
            let $object: Object = dthForm.value;
            this.rechargeBillService.rechargeBillService($object).subscribe((res: any) => {
                if (res.status && res.data.status === 'FAILED') {
                    if (res.data.detail) {
                        this.toastNotification.showToast(res.data.detail, ToastNotificationColor.ERROR);
                        this.laddaService.stop();
                        return;
                    }
                    ValidationService.remoteValidation(res.data, this.dthForm);
                    this.globalFormError = ValidationService.getErrors(this.dthForm);
                    this.laddaService.stop();
                    return;
                }
                for (let propertyName in this.dthForm.controls) {
                    this.dthForm.get(propertyName).markAsUntouched();
                }
                this.removeActiveClass(this.dthFormEl);
                this.modal();
                this.modalContent = this.htmlGeneration(res.data);
                this.dthForm.reset();
                this.dthForm.get('rechargeBillCategory').setValue(RechargeBillCategory.DTH);
                this.dthForm.clearAsyncValidators();
                this.dthForm.clearValidators();
                this.laddaService.stop();

            },
                (error: any) => {
                    this.handleError(error);
                });
        }
    }

    private removeActiveClass($form: ElementRef): void {
        let $element: HTMLElement[] = $form.nativeElement.querySelectorAll('label.active');
        for (let selector in $element) {
            if (!isNullOrUndefined($element[selector].className)) {
                this.renderer.setElementClass($element[selector], 'active', false);
            }
        }
    }

    handleChange(simType: MobileSimType) {
        this.rechargeBillService.getMobileOperators(simType).subscribe((data: any) => {
            this.mobileOperatorsCode = data;
            this.selectAction.emit('material_select');
        });
        //hack to update the text once the view initialized
        setTimeout(function () {
            this.selectAction.emit('material_select');
        }.bind(this), 500);

    }

    offerSelected($amount: number) {
        this.rechargeForm.get('amount').setValue($amount);
        document.getElementById('amount').focus(); //hack should not use directly
        this.sideNavAction.emit({ action: 'sideNav', params: ['hide'] });
    }


    getOperatorPlans($event) {
        const $operatorCode = $event.target.value;
        this.rechargeBillService.getOperatorsPlans($operatorCode).pipe(
            map((data) => Object.keys(data).map(k => data[k])))
            .subscribe((data) => {
                this.dataPlans = new Array;
                for (const item in data) {
                    if (item) {
                        for (const plan in data[item].offers) {
                            if (plan) {
                                this.dataPlans.push(data[item].offers[plan]);
                            }
                        }
                    }
                }
            });
    }

    htmlGeneration($data) {
        return '<h5><i class="small material-icons active">check_circle</i>' + $data.status + '</h5>' +
            '<div><small>Your Operator transaction id : ' + $data.txid + '</small></div>';
    }

    modal() {
        this.notificationService.notifyOther({ option: 'modal', value: 'open' });
        setTimeout((() => {
            this.notificationService.notifyOther({ option: 'modal', value: 'close' });
        }).bind(this), 10000);
    }

    private handleError(error: any) {
        this.laddaService.stop();
        if (error.code === 422) {
            this.toastNotification.showToast(error.error, ToastNotificationColor.ERROR);
            return;
        }
    }

    prepareOperatorList() {
        this.operatorList = [
            {
                name: 'Airtel',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_airtel.png'
            },
            {
                name: 'BSNL',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_bsnl.png'
            },
            {
                name: 'Aircel',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_aircel.png'
            },
            {
                name: 'Idea',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_idea.png'
            },
            {
                name: 'MTNL',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_mtnl.png'
            },
            {
                name: 'MTS',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_mts.png'
            },
            {
                name: 'Reliance GSM',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_reliancegsm.png'
            },
            {
                name: 'JIO',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_reliancejio.png'
            },
            {
                name: 'Reliance Mobile',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_reliancemobile.png'
            },
            {
                name: 'TATA Docomo',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_tatadocomo.png'
            },
            {
                name: 'TATA Indicom',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_tataindicom.png'
            },
            {
                name: 'Telenor',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_telenor.png'
            },
            {
                name: 'Videocon',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_videocon.png'
            },
            {
                name: 'Vodafone',
                logoURL: 'https://s3-ap-southeast-1.amazonaws.com/assets.paisaclub.com/telecom-logo/op_logo_vodafone.png'
            },
        ];
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}