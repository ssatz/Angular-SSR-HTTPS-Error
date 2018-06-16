/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {CategoryComponent} from './category.component';

export const categoryRoutes: Routes = [
    { path: 'category', component: CategoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(categoryRoutes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule {

}