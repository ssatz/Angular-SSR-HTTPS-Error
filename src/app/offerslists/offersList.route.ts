/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Routes} from '@angular/router';
import {OffersListsComponent} from './offersLists.component';
import {OfferListResolver} from './offersList.resolver';


export const offersListRoutes: Routes = [
    { path: 'offers', component: OffersListsComponent,
        data: {
            preload: true
        },
        resolve: {
            offersList: OfferListResolver
        }},
];
