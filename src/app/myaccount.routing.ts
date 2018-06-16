/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { Route } from '@angular/router';
import { MyAccountComponent } from './myaccount/myaccount.component';
import { AuthGuardService } from './shared/service/authGuard.service';

export const myAccountRoutes: Route[] = [{
    path: 'myaccount',
    component: MyAccountComponent,
    canActivate: [AuthGuardService],
    loadChildren: './myaccount/myaccount.module#MyAccountModule'
}];

