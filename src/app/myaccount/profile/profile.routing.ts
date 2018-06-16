/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {ProfileResolver} from './profile.resolver';
import {NgModule} from "@angular/core";



export const userProfileRoutes: Routes = [
    { path: 'profile', component: ProfileComponent,
        resolve: {
            userProfileData: ProfileResolver
        }
    }
];



@NgModule({
    imports: [RouterModule.forChild(userProfileRoutes)],
    exports: [RouterModule]
})
export class UserProfileRoutingModule {

}