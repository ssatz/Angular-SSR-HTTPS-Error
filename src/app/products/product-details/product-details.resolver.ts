
import {of as observableOf,  Observable } from 'rxjs';

import {tap} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProductService } from '../../shared/service/product.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
const PRODUCT_DETAIL_KEY = makeStateKey<any>('product.detail.result');
@Injectable()
export class ProductDetailsResolver implements Resolve<any> {
    private result: any;

    constructor(private productService: ProductService,
        private readonly transferState: TransferState) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const found = this.transferState.hasKey(PRODUCT_DETAIL_KEY);
        if (found) {
            const res = observableOf(this.transferState.get<any>(PRODUCT_DETAIL_KEY, null));
            this.transferState.remove(PRODUCT_DETAIL_KEY);
            return res;
        }
        this.transferState.onSerialize(PRODUCT_DETAIL_KEY, () => this.result);
        return this.productService.getProductBySlug(route.params['slug']).pipe(
            tap(result => this.result = result));
    }
}
