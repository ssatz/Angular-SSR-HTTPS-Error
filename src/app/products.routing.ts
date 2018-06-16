/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {Route} from '@angular/router';
import {ProductsComponent} from './products/products.component';
export const productsRoutes: Route[] = [{
    path: '',
    component: ProductsComponent,
    loadChildren: './products/products.module#ProductsModule'
}];
