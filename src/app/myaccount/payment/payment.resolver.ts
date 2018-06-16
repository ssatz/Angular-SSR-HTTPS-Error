/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {MyAccountService} from '../../shared/service/my-account.service';
import {PaymentDetails} from '../../models/payment-details.model';



@Injectable()
export class PaymentResolver implements Resolve<PaymentDetails> {
    constructor(
        private paymentService: MyAccountService
    ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<PaymentDetails> {
        return this.paymentService.paymentDetails(route.params['pager']);
    }
}