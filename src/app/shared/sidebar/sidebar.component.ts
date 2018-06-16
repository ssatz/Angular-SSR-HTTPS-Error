/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { Component, OnDestroy, AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SearchConfigService } from '../service/searchconfig.service';
import * as ps from 'perfect-scrollbar';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../service/authentication.service';
import { CommonNotificationService } from '../service/common-notification.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'sg-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [`.sidebar-color {background-color: #36465B !important;}
    .sidebar-collapse {top:-104px !important;}
    @media only screen and (min-width: 992px){
    .sidebar-collapse {
    top: -92px  !important;
        }
    }`]
})

export class SideBarComponent implements OnDestroy, AfterViewInit, OnInit {
    public isSearchboxVisible = false;
    public searchConfig;
    public userDetail: User;
    myStyle: Object = {};
    myParams: Object = {};
    width = 100;
    height = 50;

    constructor(searchConfig: SearchConfigService,
        private authService: AuthenticationService,
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: Object,
        private notificationService: CommonNotificationService) {
        this.searchConfig = searchConfig.mobileSearchBox.subscribe(data => {
            this.isSearchboxVisible = data;
        });
    }

    ngOnInit() {
        this.authService.currentUser.subscribe((user) => {
            this.userDetail = user;
        });
        this.myStyle = {
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'z-index': -1,
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0,
        };

        this.myParams = {
            particles: {
                number: {
                    value: 200,
                },
                color: {
                    value: '#ff0000'
                },
                shape: {
                    type: 'triangle',
                },
            }
        };
    }

    logoutClick($event): void {
        $event.preventDefault();
        this.notificationService.notifyOther({ option: 'logout', value: 'open', event: $event });

    }

    login($event): void {
        $event.preventDefault();
        this.notificationService.notifyOther({ option: 'login', value: 'open', event: $event, rigister: false });
    }

    register($event): void {
        $event.preventDefault();
        this.notificationService.notifyOther({ option: 'login', value: 'open', event: $event, register: true });
    }

    ngAfterViewInit() {
        setTimeout(() => function () {
            if (isPlatformBrowser(this.platformId)) {
                const leftNav = this.document.getElementById('header');
                let offset = 64;
                if (leftNav != null && leftNav !== '') {
                    offset = leftNav.offsetHeight;
                }
                const leftnavHeight = window.innerHeight - offset;
                const container = document.getElementById('slide-out');
                container.style.height = leftnavHeight.toString() + 'px';
                ps.initialize(container, { suppressScrollX: true });
            }
        }.bind(this), 100);
    }

    ngOnDestroy() {
        this.searchConfig.unsubscribe();
    }
}
