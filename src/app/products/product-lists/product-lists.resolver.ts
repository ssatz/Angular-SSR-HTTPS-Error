
import {of as observableOf,  Observable } from 'rxjs';

import {tap} from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProductService } from '../../shared/service/product.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const PRODUCT_LIST_KEY = makeStateKey<any>('product.list.result');
@Injectable()
export class ProductListsResolver implements Resolve<any> {
    private result: any;

    constructor(private productService: ProductService,
        private route: Router,
        private readonly transferState: TransferState) { }
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const found = this.transferState.hasKey(PRODUCT_LIST_KEY);
        if (found) {
            const res = observableOf(this.transferState.get<any>(PRODUCT_LIST_KEY, null));
            this.transferState.remove(PRODUCT_LIST_KEY);
            return res;
        }
        this.transferState.onSerialize(PRODUCT_LIST_KEY, () => this.result);
        if (route.params['filter']) {
            let filterData: any = route.params['filter'].split('--');
            if (filterData.length !== 2) {
                filterData = route.params['filter'].split('-');
                if (filterData.length !== 2) {
                    this.route.navigate(['404-page-not-found']);
                    return observableOf([false]);
                }
            }
            const $data = {};
            filterData[1] = this.capitalizeEachWord(this.removeUnderScoreWithSpace(filterData[1]));
            filterData[0] = this.capitalizeEachWord(this.removeUnderScoreWithSpace(filterData[0]));
            filterData[0] = filterData[0].charAt(0).toUpperCase() + filterData[0].substr(1);
            $data[filterData[1]] = filterData[0];
            Object.assign($data, route.queryParams);
            route.queryParams = $data;
        }
        return this.productService.getProductListByCategory(route.params['slug'], route.queryParams, route.params['pager']).pipe(
            tap(result => this.result = result));
    }
    capitalizeEachWord(str) {
        return str.replace(/\w\S*/g, function (txt) {
            if (this.exceptionalString().includes(txt)) {
                return txt;
            }
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        }.bind(this));
    }

    removeUnderScoreWithSpace(str) {
        return str.replace(/\-/g, ' ');
    }

    exceptionalString(): Array<string> {
        return ['mAh', 'than', 'inch'];
    }

}
