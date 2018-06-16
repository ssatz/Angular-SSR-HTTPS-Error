/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

declare let localStorage: any;

@Injectable()
export class LocalStorageService {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    }

    getItem(key: string): any {
        if (isPlatformBrowser(this.platformId)) {
            if (localStorage.getItem(key) === 'undefined') {
                localStorage.removeItem(key);
            }
            return localStorage.getItem(key);
        }
    }

    setItem(key: string, value: any) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, value);
        }
    }

    removeItem(key: string) {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.removeItem(key);
        }
    }

}
