/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import * as Ladda from 'ladda';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {ReplaySubject} from 'rxjs';
import {isNullOrUndefined} from 'util';
import '../../../../node_modules/ladda/css/ladda.scss';
import '../../../../node_modules/ladda/css/ladda-themed.scss';
@Injectable()
export class LaddaButtonSpinnerService {
    private ladda: any;
    public progressBar = new ReplaySubject<boolean>(1);

    constructor(@Inject(DOCUMENT) private document: any,
                @Inject(PLATFORM_ID) private platformId: Object,) {
    }

    public create($id?: string): void {
        if (isPlatformBrowser(this.platformId)) {
            if (isNullOrUndefined($id)) {
                this.ladda = Ladda.create(this.document.querySelector('.ladda-button'));
            } else {
                this.ladda = Ladda.create(this.document.getElementById($id));
            }
            this.ladda.setProgress(0.5);
        }
    }

    public start(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.progressBar.next(true);
            this.ladda.start();
        }
    }

    public stop(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.progressBar.next(false);
            this.ladda.stop();
        }
    }

    public remove(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.ladda.remove();
        }
    }

}
