

/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { CommonNotificationService } from '../service/common-notification.service';
import { Subscription } from 'rxjs';
import { MaterializeAction } from 'angular2-materialize';
import { AuthenticationService } from '../service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'logout-cmp',
    templateUrl: './logout.component.html',
    styles: [` #logout { top:30%!important;}
        .modal-bg{
        color:#FFFFFF;
        background: #233241;
        background: -moz-linear-gradient(-45deg,#233241 0,#1f3760 100%);
        background: -webkit-linear-gradient(-45deg,#233241 0,#1f3760 100%);
        background: linear-gradient(135deg,#233241 0,#1f3760 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#233241', endColorstr='#1f3760', GradientType=1 );}`]
})
export class LogoutComponent implements OnDestroy, OnInit {
    private subscription: Subscription;
    logoutActions = new EventEmitter<string | MaterializeAction>();
    public constructor(private notificationService: CommonNotificationService,
        private currentRoute: ActivatedRoute,
        private route: Router,
        private authService: AuthenticationService) { }
    ngOnInit() {
        this.subscription = this.notificationService.notifyObservable$.subscribe((res) => {
            if (res.hasOwnProperty('option') && res.option === 'logout') {
                if (res.value === 'open') {
                    this.openModal();
                    return;
                }
                this.closeModal(res.event);
            }
        });
    }
    logoutModal($event): void {
        $event.preventDefault();
        this.logoutActions.emit({ action: 'modal', params: ['close'] });
        this.authService.logout();
        // if (typeof this.currentRoute.routeConfig.canActivate !== 'undefined') {
        this.route.navigate(['/']);
        // } TODO:this need to be check
    }

    closeModal($event): void {
        $event.preventDefault();
        this.logoutActions.emit({ action: 'modal', params: ['close'] });
    }
    openModal(): void {
        this.logoutActions.emit({ action: 'modal', params: ['open'] });
    }
    ngOnDestroy() {
        this.logoutActions.emit({ action: 'modal', params: ['close'] });
        this.subscription.unsubscribe();
    }
}
