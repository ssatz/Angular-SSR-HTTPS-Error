/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */


import {catchError} from 'rxjs/operators';

import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OAuthHttpService } from './oAuth-http.service';
import { GlobalService } from './globals.service';
@Injectable()
export class LoggingService {
    constructor(private _http: OAuthHttpService,
        private gobalService: GlobalService) {
    }
    log($error: Object): any {
        return this._http.post(this.gobalService.API + '/api/v1/log', $error).pipe(
            catchError((error: any) => observableThrowError(error || 'Server error')));
    }

}
