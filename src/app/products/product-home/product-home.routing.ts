/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {ProductHomeComponent} from './product-home.component';



export const productHomeRoutes: Routes = [
    { path: '', component: ProductHomeComponent
    },
    { path: 'home', component: ProductHomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(productHomeRoutes)],
    exports: [RouterModule]
})
export class ProductHomeRoutingModule {

}