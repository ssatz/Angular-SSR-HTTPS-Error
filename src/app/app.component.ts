
import {distinctUntilChanged} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Component, AfterViewInit, PLATFORM_ID, Inject, Renderer2 } from '@angular/core';
import {
    Router,
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError,
} from '@angular/router';
import { PushNotificationService } from './shared/service/push-notification.service';

import { isPlatformBrowser, DOCUMENT } from '@angular/common';

declare let ga: Function;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    loading = true;
    isRedirect = false;

    constructor(private renderer: Renderer2,
        private router: Router,
        private currentRoute: ActivatedRoute,
        private pushNotifications: PushNotificationService,
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: Object) {
        this.router.events.subscribe((event: RouterEvent) => {
            this.isRedirect = false;
            this.navigationInterceptor(event);
        });
        // Using Rx's built in `distinctUntilChanged ` feature to handle url change c/o @dloomb's answer
        this.router.events.pipe(distinctUntilChanged((previous: any, current: any) => {
            // Subscribe to any `NavigationEnd` events where the url has changed
            if (current instanceof NavigationEnd) {
                return previous.url === current.url;
            }
            return true;
        })).subscribe((x: any) => {
            if (isPlatformBrowser(this.platformId)) {
                ga('set', 'page', x.url);
                ga('send', 'pageview');
            }
        });
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.pushNotifications.requestPermission();
            setTimeout(() => {
                this.renderer.addClass(this.document.querySelector('body'), 'loaded');
            }, 200);

            if (this.isTouchDevice() && this.document.getElementById('nav-moible') != null) {
                this.renderer.setProperty(this.document.getElementById('nav-mobile'), 'overflow', 'auto');
            }
        }
    }

    isTouchDevice() {
        try {
            if (isPlatformBrowser(this.platformId)) {
                this.document.createEvent('TouchEvent');
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    navigationInterceptor(event: RouterEvent): void {
        if (isPlatformBrowser(this.platformId)) {
            if (event instanceof NavigationStart) {
                this.loading = true;
            }
            if (event instanceof NavigationEnd) {
                if (this.router.url.match('/shop') || this.router.url.match('/product')) {
                    this.isRedirect = true;
                }
                this.loading = false;
                window.scrollTo(0, 0); // scroll to top position
            }

            // Set loading state to false in both of the below events to hide the spinner in case a request fails
            if (event instanceof NavigationCancel) {
                this.loading = false;
            }
            if (event instanceof NavigationError) {
                this.loading = false;
            }
        }
    }
}

