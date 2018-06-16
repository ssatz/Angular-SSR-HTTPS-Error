/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */


import {catchError, map} from 'rxjs/operators';

import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FAQ } from '../../models/faq.model';
import { OAuthHttpService } from './oAuth-http.service';
import { GlobalService } from './globals.service';
@Injectable()
export class FAQService {
    constructor(private _http: OAuthHttpService,
        private gobalService: GlobalService) {
    }

    getFAQs(): Observable<FAQ[]> {
        return this._http.get(this.gobalService.API + '/api/v1/faqs').pipe(
            map((data: { faqs: FAQ[] }) => data.faqs as FAQ[]),
            catchError((error: any) => observableThrowError(error || 'Server error')),);
    }

    contactUs($contact: Object): any {
        return this._http.post(this.gobalService.API + '/api/v1/contact-us', $contact).pipe(
            catchError((error: any) => observableThrowError(error || 'Server error')));
    }

}
