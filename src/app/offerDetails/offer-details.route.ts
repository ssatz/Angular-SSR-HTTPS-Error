/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Routes} from '@angular/router';
import {OfferDetailsComponent} from './offer-details.component';
import {OfferDetailsResolver} from './offer-details.resolver';


export const offerDetailsRoutes: Routes = [
    {
        path: 'store/:slug', component: OfferDetailsComponent,
        resolve: {
            offerDetails: OfferDetailsResolver
        }
    }
];
