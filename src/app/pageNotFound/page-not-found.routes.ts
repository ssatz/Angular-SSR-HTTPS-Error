/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';


export const pageNotFoundRoutes: Routes = [
    { path: '**', component: PageNotFoundComponent },
];
