/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */


import {pluck} from 'rxjs/operators';
import {Component, EventEmitter, OnInit, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import * as Ps from 'perfect-scrollbar';
import {BehaviorSubject, Observable} from 'rxjs';
import {OfferDetails} from '../models/offer-details.model';
import {ActivatedRoute} from '@angular/router';
import {OfferCategory} from '../models/offer-category.model';
import {MetaTagsForPages, SeoService} from '../shared/service/seo.service';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'sg-offer',
    templateUrl: './offersLists.component.html'
})

export class OffersListsComponent implements OnInit {
    filterModal = new EventEmitter<string | MaterializeAction>();
    offersList: Observable<OfferDetails[]>;
    OfferManipulation: Observable<OfferDetails[]>;
    offersCategory: Observable<OfferCategory[]>;
    offersCategorySelected = new Array<OfferCategory>();

    constructor(private activateRoute: ActivatedRoute,
                private seoService: SeoService,
                @Inject(DOCUMENT) private document: any,
                @Inject(PLATFORM_ID) private platformId: Object,
                private elRef: ElementRef) {
        this.offersList = this.activateRoute.data.pipe(pluck('offersList', 'offers'));
        this.OfferManipulation = this.offersList;
        this.offersCategory = this.activateRoute.data.pipe(pluck('offersList', 'offers_category', 'CategoryList'));
        this.seoService.setTitle('Paisaclub.com - Earn & Spend Money, Mobile Recharge!');
        this.seoService.setMetaTag(MetaTagsForPages.DESCRIPTION, 'Paisaclub.com - Offers & Coupons');

    }

    openFilterModal($event) {
        $event.preventDefault();
        this.filterModal.emit({action: 'modal', params: ['open']});
    }

    closeFilterModal($event) {
        $event.preventDefault();
        this.filterModal.emit({action: 'modal', params: ['close']});
    }

    offersSelected($event, offerCategory) {
        if ($event.target.checked) {
            this.offersCategorySelected.push(offerCategory);
        }
        else {
            let index = this.offersCategorySelected.indexOf(offerCategory);
            if ((index > -1)) {
                this.offersCategorySelected.splice(index, 1);
            }
        }
        this.offerFilterLogic();
    }

    offerCategoryRemove($event, offerCategory) {
        $event.preventDefault();
        (this.elRef.nativeElement.querySelector("#offerCategory-" + offerCategory.id) as HTMLElement).click();
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            let container = this.document.getElementById('modal-filter-content');
            Ps.initialize(container);
        }
    }

    private offerFilterLogic() {
        if (this.offersCategorySelected && this.offersCategorySelected.length <= 0) {
            this.offersList = this.activateRoute.data.pipe(pluck('offersList', 'offers'));
            return;
        }
        let selectedOfferList = new BehaviorSubject<OfferDetails[]>([]);
        let selectedOffer = new Array<OfferDetails>();
        this.OfferManipulation.forEach((offer) => {
            offer.forEach((detail) => {
                this.offersCategorySelected.forEach((offerSelected) => {
                    let findIndex = detail.ItemCategory_IDs.toString().split(",").indexOf(offerSelected.id.toString());
                    if (findIndex >= 0 && selectedOffer.indexOf(detail) == -1) {
                        selectedOffer.push(detail);
                    }
                });
            });
        });
        selectedOfferList.next(selectedOffer);
        this.offersList = selectedOfferList;
    }

    ngOnDestroy() {
        this.filterModal.emit({action: 'modal', params: ['close']});
    }
}
