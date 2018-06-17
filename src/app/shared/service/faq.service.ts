

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
        return this._http.get(this.gobalService.API + '/posts').pipe(
            map((data: FAQ[]) => data as FAQ[]),
            catchError((error: any) => observableThrowError(error || 'Server error')));
    }
}
