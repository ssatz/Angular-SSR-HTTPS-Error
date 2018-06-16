/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */


import {of as observableOf, Observable} from 'rxjs';

import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {OfferService} from '../shared/service/offer.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
const OFFER_DETAILS_KEY = makeStateKey<any>('offer.details.result');

@Injectable()
export class OfferDetailsResolver implements Resolve<any> {
    private result: any;

    constructor(private offerService: OfferService,
                private readonly transferState: TransferState) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const found = this.transferState.hasKey(OFFER_DETAILS_KEY);
        if (found) {
            const res = observableOf(this.transferState.get<any>(OFFER_DETAILS_KEY, null));
            this.transferState.remove(OFFER_DETAILS_KEY);
            return res;
        }
        this.transferState.onSerialize(OFFER_DETAILS_KEY, () => this.result);
        return this.offerService.getOfferBySlug(route.params['slug']).pipe(
            tap(result => this.result = result));
    }
}
