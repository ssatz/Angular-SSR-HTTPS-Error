
import {take} from 'rxjs/operators';
/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from './authentication.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class NoAuthGuardService implements CanActivate {
    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private localStorageService: LocalStorageService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.localStorageService.getItem('access_token')) {
            this.router.navigate(['/home']);
            return false;
        }
        this.authenticationService.isAuthenticated.pipe(take(1));
        return true;
    }
}
