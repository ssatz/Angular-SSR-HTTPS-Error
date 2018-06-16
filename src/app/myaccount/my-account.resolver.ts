/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */


import {of as observableOf, Observable} from 'rxjs';

import {tap, first} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';

import {MyAccountService} from '../shared/service/my-account.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
const MYACCOUNT_KEY = makeStateKey<any>('myaccount.home.result');
@Injectable()
export class MyAccountResolver implements Resolve<any> {
    private result: any;
    constructor(private myAccountService: MyAccountService,private readonly transferState: TransferState) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const found = this.transferState.hasKey(MYACCOUNT_KEY);
        if (found) {
            const res = observableOf(this.transferState.get<any>(MYACCOUNT_KEY, null));
            this.transferState.remove(MYACCOUNT_KEY);
            return res;
        }
        this.transferState.onSerialize(MYACCOUNT_KEY, () => this.result);
        return this.myAccountService.myAccount(route.params['pager']).pipe(first(),
            tap(result => this.result = result),);
    }
}
