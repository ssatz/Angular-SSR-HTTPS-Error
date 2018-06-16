/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Pipe, PipeTransform} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {OfferDetails} from '../../models/offer-details.model';
import {OfferCategory} from '../../models/offer-category.model';

@Pipe({
    name: 'offerFilter',
    pure: false
})

export class OfferPipeFilter implements PipeTransform {
    transform(offers:any[], args: OfferCategory[]):any {
        if(typeof args[0] !== 'undefined' && args[0] !== null) {
            let  ret =  new Array<OfferDetails>();
            offers.forEach(offer => {
                    for (let i = 0; args.length > 0; i++) {
                        if (typeof args[i] !== 'undefined' && args[i] !== null && offer.ItemCategory_IDs[0] == args[i].id) {
                            ret.push(offer);
                        }
                    }
            });
            return ret;
        }
        return offers;
    }
}