/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {UserService} from '../../shared/service/user.service';



@Injectable()
export class ProfileResolver implements Resolve<any> {
    constructor(
        private userProfile: UserService
    ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.userProfile.getUserProfile();
    }
}
