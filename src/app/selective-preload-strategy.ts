/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */


import {of as observableOf, Observable} from 'rxjs';

import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';

@Injectable()
export class PreloadSelectedModules implements PreloadingStrategy {
    preloadedModules: string[] = [];

    preload(route: Route, load: Function): Observable<any> {
        if (route.data && route.data['preload']) {
            // add the route path to our preloaded module array
            this.preloadedModules.push(route.path);
            // log the route path to the console
            console.log('Preloaded: ' + route.path);
            return load();
        } else {
            return observableOf(null);
        }
    }
}
