/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {RouterModule, Routes} from '@angular/router';
import {ReferralComponent} from './referral.component';
import {ReferralResolver} from './referral.resolver';
import {NgModule} from "@angular/core";


export const referralRoutes: Routes = [
    { path: 'referral', component: ReferralComponent,
        resolve: {
            referralData: ReferralResolver
        }
    }
];


@NgModule({
    imports: [RouterModule.forChild(referralRoutes)],
    exports: [RouterModule]
})
export class ReferralRoutingModule {

}