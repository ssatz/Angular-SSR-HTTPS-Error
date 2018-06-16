
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
declare const window: any;
@Component({
    selector: 'app-scroll-top-top',
    templateUrl: './scrollto-top.component.html',
    styleUrls: ['./scrollto-top.component.scss']
})

export class ScrollToTopComponent {
    constructor( @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: Object) {

    }

    goTop() {
        if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        }
    }
}
