/*
 * *
 *  *  * Copyright (C) glowjobs.in - All Rights Reserved
 *  *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  *  * Proprietary and confidential
 *  *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *  *
 *
 */

import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs';
import * as browser from 'bowser';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {GlobalService} from './globals.service';
declare const Notification: any;
declare const navigator: any;
declare const ServiceWorkerRegistration: any;
declare const fetch: any;
declare let Headers: any;


@Injectable()
export class PushNotificationService {
    permission: Permission;

    constructor(@Inject(DOCUMENT) private document: any,
                private globalService: GlobalService,
                @Inject(PLATFORM_ID) private platformId: Object) {
        this.permission = this.isSupported() ? Notification.permission : 'denied';
    }

    requestPermission() {
        if (isPlatformBrowser(this.platformId)) {

            setTimeout(function () {
                if ('Notification' in window) {
                    Notification.requestPermission((status: any) => this.permission = status);
                    this.registerForPush();

                }
            }.bind(this), 1000);
        }
    }

    isSupported() {
        if (isPlatformBrowser(this.platformId)) {
            let supported = true;
            if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
                console.warn('Notificationsn\'t supported in Service Workers.');
                supported = false;
            }

            if (!Notification.requestPermission) {
                console.warn("Notifications not supported by the browser");
                supported = false;
            }

            // Check if push messaging is supported
            if (!('PushManager' in window)) {
                console.warn('Pushsaging isn\'t supported.');
                supported = false;
            }

            return supported;
        }
    }

    create(title: string, options?: PushNotification): any {
        if (isPlatformBrowser(this.platformId)) {
            return new Observable((obs: any) => {

                if (!('Notification' in window)) {
                    obs.error('Notifications are not available in this environment');
                    obs.complete();
                }

                if (this.permission !== 'granted') {
                    obs.error(`The user hasn't granted you permission to send push notifications`);
                    obs.complete();
                }

                const n = new Notification(title, options);

                n.onshow = (e: any) => obs.next({notification: n, event: e});
                n.onclick = (e: any) => obs.next({notification: n, event: e});
                n.onerror = (e: any) => obs.error({notification: n, event: e});
                n.onclose = () => obs.complete();
            });
        }
    }

    registerForPush() {
        if (isPlatformBrowser(this.platformId)) {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
                    serviceWorkerRegistration.pushManager.subscribe({
                        userVisibleOnly: true
                    })
                        .then(function (subscription) {
                            this.addSubscriptionIDToDB(subscription);
                        }.bind(this))
                        .catch(function (error) {
                            console.log("Subscription for Push failed", error);
                        });
                }.bind(this));
            } else {
                console.log("No active ServiceWorker");
            }
        }
    }

    addSubscriptionIDToDB(subscription) {
        if (isPlatformBrowser(this.platformId)) {
            const apiUrl = this.globalService.API + '/api/v1/push/subscribe';
            const deviceId = subscription.endpoint.split('gcm/send/')[1];

            const options = {
                method: 'POST',
                headers: this.headers(),
                body: JSON.stringify({
                    device_id: deviceId,
                    browser: browser.name
                })
            };
            fetch(apiUrl, options);
        }
    }


    deleteSubscriptionIDFromDB(subscription) {
        if (isPlatformBrowser(this.platformId)) {
            const apiUrl = this.globalService.API + '/api/v1/push/unsubscribe/';
            const uid = subscription.endpoint.split('gcm/send/')[1];
            const options = {
                method: 'DELETE',
                headers: this.headers()
            };
            fetch(apiUrl + uid, options);
        }
    }

    private headers(): any {
        let headers: any = new Headers({'Content-Type': 'application/json'});
        headers.append('App-Auth', this.document.querySelectorAll("meta[name='app-auth']")[0].content);
        return headers;
    }


}

export type Permission = 'denied' | 'granted' | 'default';

export interface PushNotification {
    body?: string
    icon?: string
    tag?: string
    data?: any
    renotify?: boolean
    silent?: boolean
    sound?: string
    noscreen?: boolean
    sticky?: boolean
    dir?: 'auto' | 'ltr' | 'rtl'
    lang?: string
    vibrate?: number[]
}