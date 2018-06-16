import { ServerResponseService } from './../shared/service/server-response.service';


import { Component, AfterViewInit, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferDetails } from '../models/offer-details.model';
import { User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'redirect-cmp',
    templateUrl: './shop-redirect.component.html',
    styles: [` #dvRedirectContent
        {
        float: none !important;
    margin-left: auto !important;
    margin-right: auto !important;
              max-width: 70%;
            padding-top:100px !important;
}
@media screen and (max-width: 767px)
{
#dvRedirectContent
    {
    max-width: 100%;
        padding-top:25px !important;
    }
    h3{
    font-size: 20px;
}
}
.progress-bar-shop {
    position: relative !important ;
}
.logo-size{height:100px !important;width:100px !important;}`]
})


export class ShopRedirectComponent implements AfterViewInit, OnInit {
    public offerDetailsViewModel: OfferDetails;
    public user: User;
    constructor(private activateRoute: ActivatedRoute,
        private serverRes: ServerResponseService,
        @Inject(PLATFORM_ID) private platformId: Object) {
        this.offerDetailsViewModel = this.activateRoute.snapshot.data['shop']['offer']['data'];
        this.user = isNullOrUndefined(this.activateRoute.snapshot.data['shop']['user'])
            ? null : this.activateRoute.snapshot.data['shop']['user']['data'];
    }
    ngOnInit() {
        this.serverRes.setStatus(302);
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(function () {
                window.location.assign(this.offerDetailsViewModel.TrackingLink);
            }.bind(this), 800);
        }
    }
}
