/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Injectable } from '@angular/core';

import { OAuthHttpService } from './oAuth-http.service';


@Injectable()
export class AppConfig {
    private config: Object = null;

    constructor(private http: OAuthHttpService) {

    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    public load(): Promise<any> {
        return this.http.get('/config.json')
            .toPromise()
            .then((config: any) => this.config = config)
            .catch((err: any) => Promise.resolve());
    }
}


export function AppConfigServiceFactory(appConfig: AppConfig): Function {
    return () => appConfig.load();
}
