import { MobileDetectService } from './../service/mobile-detect.service';
import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, Input, OnDestroy } from '@angular/core';
import Siema from 'siema';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { IProductCarousel } from './product.model';
import { ProductCarouselOptions } from './product-carousel.options';
@Component({
    selector: 'app-product-carousel',
    templateUrl: './product-carousel.component.html',
    styleUrls: ['./product-carousel.component.scss']
})

export class ProductCarouselComponent implements AfterViewInit, OnInit, OnDestroy {
    private instance: any;
    @Input() productCarousel: Array<IProductCarousel>;
    @Input() title: string;
    cssClass: string;
    @Input() options: ProductCarouselOptions;
    constructor(@Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: Object) { }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.instance = new Siema(this.options);
            if (MobileDetectService.detectMobile()) {
                this.instance.perPage = 2;
                this.instance.init();
            }
        }
    }

    ngOnInit() {
        this.cssClass = this.options.selector.replace('.', '');
    }

    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.instance) {
                setTimeout(() => {
                    this.instance.destroy();
                    this.instance = null;
                });
            }

        }
    }

    next(e) {
        if (MobileDetectService.detectMobile()) {
            this.instance.next(2);
        } else {
            this.instance.next(6);
        }
    }

    prev(e) {
        if (MobileDetectService.detectMobile()) {
            this.instance.prev(2);
        } else {
            this.instance.prev(6);
        }
    }
}
