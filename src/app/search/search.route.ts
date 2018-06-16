/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {Routes} from '@angular/router';
import {NoAuthGuardService} from '../shared/service/noAuthGuard.service';
import {SearchComponent} from './search.component';
import {SearchResolver} from './search.resolver';


export const searchRoutes: Routes = [
    {
        path: 'search', component: SearchComponent,
        resolve: {
            productSearchList: SearchResolver
        }
    },
];
