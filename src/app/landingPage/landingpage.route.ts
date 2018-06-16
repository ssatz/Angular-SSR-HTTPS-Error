/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Routes} from '@angular/router';
import {LandingPageComponent} from './landingpage.component';
import {LandingPageResolver} from './landingpage.resolver';


export const landingPageRoutes: Routes = [
    {
        path: 'home', component: LandingPageComponent,
        resolve: {
            landingPage: LandingPageResolver
        }
    },
    {
        path: '', component: LandingPageComponent,
        resolve: {
            landingPage: LandingPageResolver
        }
    }
];
