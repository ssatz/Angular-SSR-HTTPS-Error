/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable()
export class SearchConfigService {
    mobileSearchBox: BehaviorSubject<boolean> = new BehaviorSubject(false);

    setEvent(value: boolean) {
        this.mobileSearchBox.next(value);
    }

}
