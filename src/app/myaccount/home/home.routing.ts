/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { MyAccountResolver } from '../my-account.resolver';

export const homeRoutes: Routes = [
    {
        path: '', component: HomeComponent,
        resolve: {
            earnings: MyAccountResolver
        }
    },

    {
        path: 'home', component: HomeComponent,
        resolve: {
            earnings: MyAccountResolver
        }
    },
    {
        path: 'home/:pager', component: HomeComponent,
        resolve: {
            earnings: MyAccountResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}
