/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {PaymentRequests} from './payment-requests.model';
export interface PaymentDetails{
    TotalEarning:number;
    Paid:number;
    PendingPayment:number;
    Balance:number;
    BankAccount:string;
    MinimumPaymentAmount:number;
    PaymentRequests:PaymentRequests[];
    TotalPaymentCount:number;
    IsAcknowledgementPending:boolean;
}
