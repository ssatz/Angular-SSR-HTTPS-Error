/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */


import {of as observableOf, Observable} from 'rxjs';

import {tap} from 'rxjs/operators';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {ProductService} from '../shared/service/product.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
const SEARCH_KEY = makeStateKey<any>('search.result');

@Injectable()
export class SearchResolver implements Resolve<any> {
    private result: any;

    constructor(private productService: ProductService, private readonly transferState: TransferState) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const found = this.transferState.hasKey(SEARCH_KEY);
        if (found) {
            const res = observableOf(this.transferState.get<any>(SEARCH_KEY, null));
            this.transferState.remove(SEARCH_KEY);
            return res;
        }
        this.transferState.onSerialize(SEARCH_KEY, () => this.result);
        return this.productService.getProductListBySearch(route.queryParams).pipe(
            tap(result => this.result = result));
    }
}
