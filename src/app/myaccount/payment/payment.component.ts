
import {of as observableOf, Observable} from 'rxjs';

import {pluck} from 'rxjs/operators';
/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidationService} from '../../shared/service/validation.service';
import {PagerService} from '../../shared/service/pager.service';
import {isNullOrUndefined} from 'util';
import {MyAccountService} from '../../shared/service/my-account.service';
import {ToastService} from '../../shared/service/toast.service';
import {PaymentDetails} from '../../models/payment-details.model';
import {PaymentRequests} from '../../models/payment-requests.model';
import {LaddaButtonSpinnerService} from '../../shared/service/LaddaButtonSpinnerService';

@Component({
    selector: 'payment-cmp',
    templateUrl: './payment.component.html',
    styles: ['.input-field div.error{top:-10px !important;}.ladda-button{padding:12px 35px!important}']
})

export class PaymentComponent implements OnInit {
    public paymentDetails: Observable<PaymentDetails>;
    public paymentRequests: Observable<PaymentRequests[]>;
    public paymentForm: FormGroup;
    public totalNumber: number;
    pager: any;
    currentPage: number;
    formBuilder: FormBuilder;

    constructor(private route: ActivatedRoute,
                private navigation: Router,
                formBuilder: FormBuilder,
                private paymentService: MyAccountService,
                private toastService: ToastService,
                private ladda: LaddaButtonSpinnerService,
                private pagerService: PagerService) {
        this.formBuilder = formBuilder;
        this.paymentDetails = this.route.data.pipe(pluck('paymentDetails'));
        this.paymentRequests = this.route.data.pipe(pluck('paymentDetails', 'PaymentRequests'));
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.currentPage = isNullOrUndefined(params['pager']) ? 1 : params['pager'];
        });

        this.paymentForm = this.formBuilder.group({
            transfer_confirm: ['', [<any>ValidationService.checkboxRequired]]
        });
        this.paymentDetails.subscribe((data) => {
            this.totalNumber = data.TotalPaymentCount as number;
        });
        this.pager = this.pagerService.getPager(this.totalNumber, this.currentPage);
        this.ladda.create('payment-request');
    }

    paymentFormDetails(paymentDetails, isValid: boolean) {
        this.paymentForm.get('transfer_confirm').markAsTouched();
        if (isValid) {
            this.ladda.start();
            this.paymentService.paymentRequest(paymentDetails).subscribe((data: any) => {
                console.log(data);
                this.paymentDetails = observableOf(data.payment);
                this.paymentRequests = observableOf(data.payment.PaymentRequests);
                this.pager = this.pagerService.getPager(this.totalNumber, 1);
                this.paymentForm.reset();
                this.paymentForm.get('transfer_confirm').markAsUntouched();
                this.toastService.showToast(data.message);
                this.ladda.stop();
                this.navigation.navigateByUrl('myaccount/payment/1');
            })
        }
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.totalNumber, page);
        this.navigation.navigateByUrl('myaccount/payment/' + page);
        this.paymentDetails = this.route.data.pipe(pluck('paymentDetails'));
        this.paymentRequests = this.route.data.pipe(pluck('paymentDetails', 'PaymentRequests'));
    }

    isEligibleAmount(): boolean {
        let transferEligible: boolean = false;
        this.paymentDetails.subscribe((data) => {
            transferEligible = (data.Balance >= data.MinimumPaymentAmount) as boolean;
        });
        return transferEligible;
    }

    submitAcknowledge($paymentRequest: PaymentRequests) {
        this.paymentService.paymentAcknowledge($paymentRequest, this.currentPage).subscribe((paymentData) => {
            this.paymentDetails = observableOf(paymentData);
            this.paymentRequests = observableOf(paymentData.PaymentRequests);
            this.toastService.showToast('Thanks for acknowledging the payment');
        });
    }

}
