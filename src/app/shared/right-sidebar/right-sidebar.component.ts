/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {Component, OnInit, Input, Output, EventEmitter, PLATFORM_ID, Inject} from '@angular/core';

import * as Ps from 'perfect-scrollbar';
import {CommonNotificationService} from '../service/common-notification.service';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
@Component({
    selector: 'right-sidebar',
    templateUrl: './right-sidebar.component.html',
    styleUrls: ['./right-sidebar.component.scss']
})

export class RightSideBarComponent implements OnInit {
    @Input() offers;
    @Output() offerSelected = new EventEmitter<number>();

    constructor(private notificationService: CommonNotificationService,
                @Inject(DOCUMENT) private document: any,
                @Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            Ps.initialize(document.getElementById('plans'));
        }
    }

    rightSideBarClose($event) {
        $event.preventDefault();
        this.notificationService.notifyOther({action: 'sideNav', params: ['hide']});
    }

    offerSelect(amount) {
        this.offerSelected.emit(amount);
    }
}
