/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */


import {interval as observableInterval, fromEvent as observableFromEvent, throwError as observableThrowError,  Observable } from 'rxjs';

import {switchMap, distinctUntilChanged, throttle, filter, map, catchError, merge} from 'rxjs/operators';
import { Injectable, ElementRef } from '@angular/core';
import { OAuthHttpService } from './oAuth-http.service';









import { OperatorCodes } from '../../models/operator-codes.model';
import { OperatorsType } from '../../models/operators-type';
import { MobileOffers } from '../../models/mobile-offers.model';
import { ToastService } from './toast.service';
import { GlobalService } from './globals.service';

@Injectable()
export class RechargeBillServices {
    constructor(private oauthHttpService: OAuthHttpService,
        private globalService: GlobalService,
        private toastService: ToastService) {
    }

    getMobileOperators($simType: number): Observable<OperatorCodes[]> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/mobile/' + $simType).pipe(
            map((data) => Object.keys(data).map(k => data[k])),
            catchError((error: any) => observableThrowError(error.error || 'Server error')),);
    }

    getOperators(): Observable<OperatorsType> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/operators').pipe(
            map((data) => data as OperatorsType),
            catchError((error: any) => observableThrowError(error.error || 'Server error')),);
    }

    // Circle code 23 is chennai. Make it as default
    getOperatorsPlans($operatorCode: string, $circleCode: number = 23): Observable<MobileOffers[]> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/operators/plans/' + $operatorCode + '/' + $circleCode).pipe(
            map((data: { mobile_offers: MobileOffers[] }) => data.mobile_offers as MobileOffers[]),
            catchError((error: any) => observableThrowError(error.error || 'Server error')),);
    }

    operatorFinder($mobileNumber: number): Observable<any> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/operators/finder/' + $mobileNumber).pipe(
            catchError((error: any) => observableThrowError(error.error || 'Server error')));
    }

    rechargeBillService($data: Object): Observable<any> {
        return this.oauthHttpService.post(this.globalService.API + '/api/v1/service', $data).pipe(
            catchError((error: any) => observableThrowError(error.error || 'Server error')));
    }

    operatorFinderEvent(element: ElementRef, event: string): Observable<any> {
        const observableEvents = observableFromEvent<any>(element.nativeElement, event);
        const focusout = observableFromEvent<any>(element.nativeElement, 'focusout');
        observableEvents.pipe(merge(focusout));
        return observableEvents.pipe(
            map(function (e) {
                return e.target.value; // Project the text from the input
            }),
            filter(function (text) {
                return text.length > 4; // Only if the text is longer than 2 characters
            }),
            throttle(ev => observableInterval(1000)),
            distinctUntilChanged(), // Only if the value has changed
            switchMap(mobile => this.operatorFinder((mobile))),); // Ensure no out of order results
    }
}
