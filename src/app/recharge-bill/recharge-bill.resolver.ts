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
import {RechargeBillServices} from '../shared/service/recharge-bill.service';
import {OperatorsType} from '../models/operators-type';
import {makeStateKey, TransferState} from '@angular/platform-browser';
const RECHARGE_KEY = makeStateKey<OperatorsType>('recharge-bill.result');

@Injectable()
export class RechargeBillResolver implements Resolve<OperatorsType> {
    private result: OperatorsType;

    constructor(private rechargeBillService: RechargeBillServices,
                private readonly transferState: TransferState) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<OperatorsType> {
        const found = this.transferState.hasKey(RECHARGE_KEY);
        if (found) {
            const res = observableOf(this.transferState.get<OperatorsType>(RECHARGE_KEY, null));
            this.transferState.remove(RECHARGE_KEY);
            return res;
        }
        this.transferState.onSerialize(RECHARGE_KEY, () => this.result);
        return this.rechargeBillService.getOperators().pipe(
            tap(result => this.result = result));
    }
}
