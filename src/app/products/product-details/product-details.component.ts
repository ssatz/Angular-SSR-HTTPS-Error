import { MobileDetectService } from './../../shared/service/mobile-detect.service';
import { Inject, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, MetaTagsForPages } from '../../shared/service/seo.service';
import { ProductDetails } from '../../models/product-details.model';
import * as Ps from 'perfect-scrollbar';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
@Component({
    selector: 'app-product-detail',
    templateUrl: './product-details.component.html',
    styles: [`
.collection-product
{
    border: none !important;
}
.btn-shop
{
    margin-top: 12px !important;
}

.product-detail-header
{
    font-size: 20px !important;
    color: grey !important;
}

.product-details-image
{
    max-height: 200px !important;
}

.content-product-offers
{
    padding: 10px !important;
    min-height: 150px !important;
    max-height: 150px !important;
    font-size: small !important;
}

.spec-header
{
    font-size: 16px !important;
}

.spec-key
{
    font-size: small !important;
    color: grey !important;
    width: 30% !important;
}

.spec-value
{
    font-size: small !important;
}

.store-offer-text
{
    font-size: 13px !important;
}

.product-price-compare
{
    font-size: 16px !important;
}
.margin-bottom-0
{
    margin-bottom: 0px !important;
}
.sticky {
    position: fixed;
    z-index: 9;
    top:0px;
  }
  .sticky + .product-details {
    padding-top: 102px;
  }
  .prod-image{
      height:200px !important;
  }
.padding-0
{
    padding: 0px !important;
}

.btn-shopnow
{
    width: 65px !important;
    height: 20px !important;
    padding: 0px !important;
    line-height: 10px !important;
    color: white !important;
}

.btn-shopnow>a
{
    font-size:10px !important;
}

.price-col-store-width
{
    width:25% !important;
}
.price-col-price-width
{
    width:25% !important;
}
.price-col-offer-width
{
    width:50% !important;
}

@media only screen and (max-width: 600px) {
    .product-details-image
    {
        max-height: 150px !important;
    }

    .price-col-store-width
    {
        width:35% !important;
    }
    .price-col-price-width
    {
        width:35% !important;
    }
    .price-col-offer-width
    {
        width:30% !important;
    }
}
`]
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
    productDetailsVM: ProductDetails;
    constructor(private activateRoute: ActivatedRoute,
        private seoService: SeoService,
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(DOCUMENT) private document: any) {
        this.productDetailsVM = this.activateRoute.snapshot.data['productDetails'];
    }
    ngOnInit() {
        this.seoService.setTitle(this.productDetailsVM.name + ':Paisaclub.com');
        this.seoService.setMetaTag(MetaTagsForPages.DESCRIPTION, this.productDetailsVM.description);
        this.seoService.setMetaTag(MetaTagsForPages.KEYWORDS, this.productDetailsVM.keyspec);

    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId) && MobileDetectService.detectMobile()) {
            const tabHeader = this.document.getElementById('tab-header');
            const tabs = this.document.getElementById('tabs');
            const tabClass = this.document.querySelectorAll('.tab > a') as HTMLCollection;
            const header = this.document.getElementById('header');
            const sticky = tabHeader.offsetTop;
            Ps.initialize(this.document.getElementById('tabs'), {
                suppressScrollY: true
            });

            window.onscroll = () => {
                if (window.pageYOffset >= sticky) {
                    tabHeader.classList.add('sticky');
                    header.classList.add('hide');
                    tabs.style.position = 'fixed';
                    tabs.style.backgroundColor = '#36465B';
                    for (let i = 0; i < tabClass.length; i++) {
                        (tabClass.item(i) as HTMLElement).style.color = '#fafafa';
                    }
                } else {
                    tabHeader.classList.remove('sticky');
                    header.classList.remove('hide');
                    tabs.style.position = 'relative';
                    tabs.style.backgroundColor = '#fff';
                    for (let i = 0; i < tabClass.length; i++) {
                        (tabClass.item(i) as HTMLElement).style.color = '';
                    }
                }
            };
        }
    }

}
