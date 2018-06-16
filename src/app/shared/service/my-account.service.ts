
import {map, catchError} from 'rxjs/operators';

import {throwError as observableThrowError, Observable} from 'rxjs';
/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Injectable} from '@angular/core';
import {OAuthHttpService} from './oAuth-http.service';

import {Earnings} from '../../models/earnings.model';
import {isNullOrUndefined} from 'util';
import {PaymentDetails} from '../../models/payment-details.model';
import {PaymentRequests} from '../../models/payment-requests.model';
import {GlobalService} from './globals.service';

@Injectable()
export class MyAccountService {
    constructor(private oauthHttpService: OAuthHttpService,
                private globalService: GlobalService) {
    }

    myAccount($page?: number): Observable<Earnings> {
        const $url = isNullOrUndefined($page) ? '/api/v1/myaccount' : '/api/v1/myaccount/' + $page;
        return this.oauthHttpService.get(this.globalService.API + $url).pipe(
            map((data: {earnings: Earnings}) => data.earnings as Earnings),
            catchError((error: any) => observableThrowError(error.json() || 'Server error')),);
    }

    paymentDetails($page?: number): Observable<PaymentDetails> {
        const $url = isNullOrUndefined($page) ? '/api/v1/payment' : '/api/v1/payment/' + $page;
        return this.oauthHttpService.get(this.globalService.API + $url).pipe(
            map((data: {payment: PaymentDetails}) => data.payment as PaymentDetails),
            catchError((error: any) => observableThrowError(error.json() || 'Server error')),);
    }

    paymentAcknowledge(paymenRequest: PaymentRequests, $page: any): Observable<PaymentDetails> {
        return this.oauthHttpService.post(this.globalService.API + '/api/v1/payment/acknowledge', {
            payment: paymenRequest,
            page: $page
        }).pipe(
            map((data: {payment: PaymentDetails}) => data.payment as PaymentDetails),
            catchError((error: any) => observableThrowError(error.json() || 'Server error')),);
    }

    paymentRequest(paymentRequestConfirmation: any) {
        return this.oauthHttpService.post(this.globalService.API + '/api/v1/payment/request', paymentRequestConfirmation).pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }
}


