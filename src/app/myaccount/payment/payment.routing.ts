/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {RouterModule, Routes} from "@angular/router";
import {PaymentComponent} from "./payment.component";
import {PaymentResolver} from './payment.resolver';
import {NgModule} from "@angular/core";

export const paymentRoutes: Routes = [
    { path: 'payment', component: PaymentComponent,
        resolve: {
            paymentDetails: PaymentResolver
        }
    },
    { path: 'payment/:pager', component: PaymentComponent,
        resolve: {
            paymentDetails: PaymentResolver
        }
    }
];


@NgModule({
    imports: [RouterModule.forChild(paymentRoutes)],
    exports: [RouterModule]
})
export class PaymentRoutingModule {

}