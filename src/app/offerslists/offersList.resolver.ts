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
const OFFER_LIST_KEY = makeStateKey<any>('offer.list.result');

@Injectable()
export class OfferListResolver implements Resolve<any> {
    private result: any;

    constructor(private offerService: OfferService,
                private readonly transferState: TransferState) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const found = this.transferState.hasKey(OFFER_LIST_KEY);
        if (found) {
            const res = observableOf(this.transferState.get<any>(OFFER_LIST_KEY, null));
            this.transferState.remove(OFFER_LIST_KEY);
            return res;
        }
        this.transferState.onSerialize(OFFER_LIST_KEY, () => this.result);
        return this.offerService.getOffers().pipe(
            tap(result => this.result = result));
    }
}
