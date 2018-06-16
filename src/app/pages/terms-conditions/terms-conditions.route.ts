/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {Routes, RouterModule} from "@angular/router";
import {TermsConditionsComponent} from './terms-conditions.component';
import {NgModule} from '@angular/core';


export const termsConditionsRoutes:Routes = [
    {
        path:'terms-conditions',
        component:TermsConditionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(termsConditionsRoutes)],
    exports: [RouterModule]
})
export class TermsConditionsRoutingModule {

}
