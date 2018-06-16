/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {MobilePlans} from './mobile-plans.model';
export interface MobileOffers{
    _id:string;
    mobile_operator_code:string;
    mobile_plan_code:number;
    operator_category_code:string;
    operator_circle_code:number;
    offers:MobilePlans[];
}
