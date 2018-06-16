
import {of as observableOf,  Observable } from 'rxjs';

import {tap} from 'rxjs/operators';
/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { OfferService } from '../shared/service/offer.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const HOME_KEY = makeStateKey<any>('landingPage.result');

@Injectable()
export class LandingPageResolver implements Resolve<any> {
    private result: any;

    constructor(private landingPageService: OfferService,
        private readonly transferState: TransferState) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const found = this.transferState.hasKey(HOME_KEY);
        if (found) {
            const res = observableOf(this.transferState.get<any>(HOME_KEY, null));
            this.transferState.remove(HOME_KEY);
            console.log(res);
            return res;
        }
        this.transferState.onSerialize(HOME_KEY, () => this.result);
        return this.landingPageService.getOffersForLanding().pipe(
            tap(result => this.result = result));
    }
}
