/*
 * *
 *  *  * Copyright (C) glowjobs.in - All Rights Reserved
 *  *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  *  * Proprietary and confidential
 *  *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *  *
 *
 */


import {catchError, map} from 'rxjs/operators';

import {throwError as observableThrowError,  BehaviorSubject ,  Observable } from 'rxjs';
import { OAuthHttpService } from './oAuth-http.service';
import { ProductDetails } from '../../models/product-details.model';
import { Injectable } from '@angular/core';



import { ProductCategoryLists } from '../../models/product-category-lists.model';
import { GlobalService } from './globals.service';
import { MegaMenu } from '../../models/menu.model';



@Injectable()
export class ProductService {
    private megaMenu: BehaviorSubject<MegaMenu>;
    constructor(private oauthHttpService: OAuthHttpService,
        private globalService: GlobalService) {
        this.initializeMegaMenu();
    }
    getProductBySlug($slug: string): Observable<any> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/product/' + $slug).pipe(
            map((data: { product: ProductDetails }) => data.product as ProductDetails),
            catchError((error: any) => observableThrowError(error || 'Server error')),);
    }
    getProductListByCategory($slug: string, $query: any, $pager: number = 1): Observable<any> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/category/' + $slug + '/' + $pager, $query).pipe(
            map((data: { products: ProductCategoryLists }) => data.products as ProductCategoryLists),
            catchError((error: any) => observableThrowError(error || 'Server error')),);
    }
    getProductListBySearch($query: any): Observable<any> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/product/search', $query).pipe(
            map((data: { products: ProductCategoryLists }) => data.products as ProductCategoryLists),
            catchError((error: any) => observableThrowError(error || 'Server error')),);
    }
    getMegaMenu(): Observable<any> {
        return this.megaMenu.asObservable();
    }

    initializeMegaMenu(): void {
        if (!this.megaMenu) {
            this.megaMenu = new BehaviorSubject<MegaMenu>(null);
            this.oauthHttpService.get(this.globalService.API + '/api/v1/mega-menu').pipe(
                map((data: { menu: MegaMenu }) => data.menu as MegaMenu),
                catchError((error: any) => observableThrowError(error)),)
                .subscribe(data => {
                    this.megaMenu.next(data);
                },
                    error => console.log('Error  initialize to MegaMenu : ' + error)
                );
        }
    }
    productRedirectShop($seoName: string, $pid: any): Observable<any> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/product-shop/' + $seoName, $pid).pipe(
            catchError((error: any) => observableThrowError(error || 'Server error')));
    }
}
