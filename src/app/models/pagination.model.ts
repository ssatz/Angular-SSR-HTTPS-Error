/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {PaymentRequests} from './payment-requests.model';
export interface Pagination {
    current_page:number;
     data: PaymentRequests[];
     from:number;
     last_page:number;
     next_page_url:string;
     per_page:number;
     prev_page_url:string;
     to:number;
     total:number;
}
