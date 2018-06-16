/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OAuthHttpService {
    constructor(private _http: HttpClient) {
    }

    get(url: string, queryString?: any): Observable<any> {
        return this._http.get(url, { params: queryString });
    }

    post(url: string, body: Object, options?: Object): Observable<any> {
        const bodyString = JSON.stringify(body);
        console.log(bodyString);
        return this._http.post(url, bodyString, options);
    }

    put(url: string, body: Object, queryString?: any): Observable<any> {
        const bodyString = JSON.stringify(body);
        return this._http.put(url, bodyString, { params: queryString });
    }

    delete(url: string, queryString?: any): Observable<any> {
        return this._http.delete(url, { params: queryString });

    }

    login(url: string, body: string, options?: Object): Observable<any> {
        return this._http.post(url, body, options);
    }
}
