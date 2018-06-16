/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Routes } from '@angular/router';
import {ResetPasswordComponent} from './reset-password.component';
import {NoAuthGuardService} from '../shared/service/noAuthGuard.service';



export const resetPasswordRoutes: Routes = [
    { path: 'password/reset/:token/:email', component: ResetPasswordComponent,canActivate: [NoAuthGuardService] },
    { path: 'password/reset/:token', component: ResetPasswordComponent,canActivate: [NoAuthGuardService] }
];
