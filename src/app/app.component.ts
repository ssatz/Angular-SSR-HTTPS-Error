
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

import { isPlatformBrowser, DOCUMENT } from '@angular/common';

declare let ga: Function;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    loading = true;
    isRedirect = false;

    constructor(private renderer: Renderer2,
        private router: Router,
        private currentRoute: ActivatedRoute,
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: Object) {
    }
}

