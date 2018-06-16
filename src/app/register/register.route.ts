/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Routes} from "@angular/router";
import {RegisterComponent} from "./register.component";
import {NoAuthGuardService} from '../shared/service/noAuthGuard.service';


export const registerRoutes: Routes = [
    { path: 'register', component: RegisterComponent,canActivate:[NoAuthGuardService] },
    { path: 'register/referral/:userid', component: RegisterComponent,canActivate:[NoAuthGuardService] },
];
