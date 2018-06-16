/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class CommonNotificationService {
    private notify = new Subject<any>();
    /**
     * Observable string streams
     */
    notifyObservable$ = this.notify.asObservable();

    constructor() { }

    public notifyOther(data: any) {
        if (data) {
            this.notify.next(data);
        }
    }
}
