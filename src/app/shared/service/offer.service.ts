
import {catchError} from 'rxjs/operators';

import {throwError as observableThrowError,  Observable } from 'rxjs';
/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { Injectable } from '@angular/core';
import { OAuthHttpService } from './oAuth-http.service';


import { OfferDetailsViewModel } from '../../models/offer-details-view.model';
import { GlobalService } from './globals.service';

@Injectable()
export class OfferService {
    constructor(private oauthHttpService: OAuthHttpService,
        private globalService: GlobalService) {
    }

    getOffers(): Observable<any> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/getOffers').pipe(
            catchError((error: any) => observableThrowError(error || 'Server error')));
    }

    getOfferBySlug($slug: string): Observable<OfferDetailsViewModel> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/offer/' + $slug).pipe(
            catchError((error: any) => observableThrowError(error || 'Server error')));
    }

    searchOfferByName($queryString: any) {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/offer/search/' + $queryString).pipe(
            catchError((error: any) => observableThrowError(error || 'Server error')));
    }

    getOffersForLanding(): Observable<any> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/offer/landing').pipe(
            catchError((error: any) => observableThrowError(error || 'Server error')));
    }

    offerRedirectShop($seoName: string): Observable<any> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/shop/' + $seoName).pipe(
            catchError((error: any) => observableThrowError(error || 'Server error')));
    }
}
