/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {Routes} from "@angular/router";
import {RechargeBillComponent} from './reharge-bill.component';
import {RechargeBillResolver} from './recharge-bill.resolver';

export const rechargeBillRoutes: Routes = [
    { path: 'recharge-bill-payment', component: RechargeBillComponent,
        data: {
            preload: true
        },
        resolve: {
            rechargeBill: RechargeBillResolver
        }
    }
];