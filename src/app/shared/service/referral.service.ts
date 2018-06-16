
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


import { Response } from '@angular/http';
import { GlobalService } from './globals.service';


@Injectable()
export class ReferralService {
    constructor(private oauthHttpService: OAuthHttpService,
        private globalService: GlobalService) {
    }

    getReferrals(): Observable<any> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/referral').pipe(
            catchError((error: any) => observableThrowError(error || 'Server error')));
    }

    sendInvite(email: string): Observable<any> {
        return this.oauthHttpService.post(this.globalService.API + '/api/v1/referral/invite', email).pipe(
            catchError((error: any) => observableThrowError(error || 'Server error')));
    }
}
