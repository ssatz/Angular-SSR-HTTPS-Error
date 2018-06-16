/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import {NoAuthGuardService} from '../shared/service/noAuthGuard.service';

export const loginRoutes: Routes = [
    { path: 'login', component: LoginComponent,canActivate: [NoAuthGuardService] },
];
