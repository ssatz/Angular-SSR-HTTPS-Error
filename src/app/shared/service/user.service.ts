
import {catchError, map} from 'rxjs/operators';

import {throwError as observableThrowError, Observable} from 'rxjs';
/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Injectable} from '@angular/core';
import {OAuthHttpService} from './oAuth-http.service';
import {User} from '../../models/user.model';
import {FacebookToken} from '../../models/fb-token.model';
import {GooglePlusToken} from '../../models/gplus-token.model';
import {UserProfile} from '../../models/user-profile.model';
import {Password} from '../../models/password.model';
import {BankAccountDetails} from '../../models/bank-details.model';
import {SocialLogin} from '../../models/social-login.model';
import {GlobalService} from './globals.service';


@Injectable()
export class UserService {
    constructor(private oauthHttpService: OAuthHttpService,
                private globalService: GlobalService) {
    }

    getUserInfo(): Observable<User> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/user').pipe(
            map((data: {user: User}) => data.user as User),
            catchError((error: any) => observableThrowError(error.json() || 'Server error')),);
    }

    createFbUser(fbToken: FacebookToken): Observable<SocialLogin> {
        return this.oauthHttpService.post(this.globalService.API + '/api/v1/register', fbToken).pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }

    createGplusUser(gPlusToken: GooglePlusToken): Observable<SocialLogin> {
        return this.oauthHttpService.post(this.globalService.API + '/api/v1/register', gPlusToken).pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }

    getUserProfile(): Observable<UserProfile> {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/user').pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }

    updateUserProfile(user: User): Observable<any> {
        return this.oauthHttpService.put(this.globalService.API + '/api/v1/user/update', user).pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }

    createOrUpdateBankDetails(bank: BankAccountDetails): Observable<any> {
        return this.oauthHttpService.post(this.globalService.API + '/api/v1/bank', bank).pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }

    forgotPassword(email: string): Observable<any> {
        return this.oauthHttpService.post(this.globalService.API + '/api/v1/forgotPassword', email).pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }

    resetPassword(password: Object): Observable<any> {
        return this.oauthHttpService.post(this.globalService.API + '/api/v1/password/reset', password).pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }

    profilePasswordChange(password: Password): Observable<any> {
        return this.oauthHttpService.put(this.globalService.API + '/api/v1/user/password', password).pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }

    issueCodeverifyMobile() {
        return this.oauthHttpService.get(this.globalService.API + '/api/v1/user/mobile').pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }

    verifyMobile($smsCode: Object): Observable<any> {
        return this.oauthHttpService.post(this.globalService.API + '/api/v1/user/mobile', $smsCode).pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }

    resendCodeVerifyMobile($smsCode: Object) {
        return this.oauthHttpService.put(this.globalService.API + '/api/v1/user/mobile', $smsCode).pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }

    emailSubscription($email: Object) {
        return this.oauthHttpService.post(this.globalService.API + '/api/v1/subscribe', $email).pipe(
            catchError((error: any) => observableThrowError(error.json() || 'Server error')));
    }
}

