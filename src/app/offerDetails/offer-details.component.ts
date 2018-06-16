/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OfferDetailsViewModel} from '../models/offer-details-view.model';
import {SeoService, MetaTagsForPages} from '../shared/service/seo.service';
import {SocialLoginService} from '../shared/service/social-login.service';

@Component({
    selector: 'sg-offer-details',
    templateUrl: './offer-details.component.html'
})

export class OfferDetailsComponent implements OnInit {
    offerDetailsViewModel: OfferDetailsViewModel;
    public url;
    public referral;

    constructor(private socialShare: SocialLoginService,
                private activateRoute: ActivatedRoute,
                private seoService: SeoService) {
        this.offerDetailsViewModel = this.activateRoute.snapshot.data['offerDetails'];

    }

    ngOnInit() {
        this.seoService.setTitle(this.offerDetailsViewModel.offerInfo.name +
            ' - Cashback Upto ' + this.offerDetailsViewModel.offerInfo.pc_Payout);
        this.seoService.setMetaTag(MetaTagsForPages.DESCRIPTION, this.offerDetailsViewModel.offerInfo.name +
            ' - Cashback Upto ' + this.offerDetailsViewModel.offerInfo.pc_Payout);
        this.seoService.setMetaTag(MetaTagsForPages.IMAGE, window.location.host + this.offerDetailsViewModel.offerInfo.ImageUrl);

        this.activateRoute.params.subscribe((params) => {
            this.offerDetailsViewModel = this.activateRoute.snapshot.data['offerDetails'];
        });
    }

    fbshare($event): void {
        $event.preventDefault();
        this.socialShare.fbShare();
    }

    twitterShare($event): void {
        $event.preventDefault();
    }


}
