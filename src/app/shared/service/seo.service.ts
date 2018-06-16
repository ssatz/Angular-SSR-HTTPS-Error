/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Injectable, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, NavigationEnd} from '@angular/router';
import {DOCUMENT} from '@angular/common';


@Injectable()

export class SeoService {


    constructor(private titleService: Title,
                private router: Router,
                @Inject(DOCUMENT) private document: any) {
        this.titleService = titleService;
        this.setCanonicalLink(this.router.url);
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.setCanonicalLink(event.urlAfterRedirects);
            }
        });

    }

    /**
     * @param newTitle
     */
    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
        let el = this.document.querySelectorAll("meta[property='og:title'],meta[name='twitter:title']");
        for (let element of el) {
            element.setAttribute('content', newTitle);
        }
    }

    public setMetaTag(name: string, content: string): HTMLElement {
        if (name == MetaTagsForPages.DESCRIPTION || name === MetaTagsForPages.IMAGE) {
            let el = this.document.querySelectorAll(`meta[property='og:${name}'],meta[name='twitter:${name}']`);
            for (let element of el) {
                element.setAttribute('content', content);
            }
        }
        let elName: HTMLElement = this.getOrCreateMetaTag(name);
        elName.setAttribute('content', content);
        return elName;
    }

    /**
     *
     * @param url
     */
    private setCanonicalLink(url: string): void {
        let el = this.document.querySelector("link[rel='canonical']");
        el.setAttribute('href', window.location.origin + url);
        let elUrl = this.document.querySelector("meta[property='og:url']");
        elUrl.setAttribute('content', window.location.origin + url);
        return;
    }

    private getOrCreateMetaTag(name: string): HTMLElement {
        let el = this.document.querySelector(`meta[name='${name}']`);
        if (!el) {
            el = this.document.createElement('meta');
            el.setAttribute('name', name);
            this.document.head.appendChild(el);
        }
        return el;
    }
}

export class MetaTagsForPages {
    static readonly DESCRIPTION: string = 'description';
    static readonly KEYWORDS: string = 'keywords';
    static readonly IMAGE: string = 'image';
}
