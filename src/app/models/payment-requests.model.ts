/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
export interface PaymentRequests {
    id:number;
    UserId:number;
    BankAccount:string;
    AmountRequested:number;
    PaymentStatusId:number;
    PaymentTransactionId:any;
    Transacted_at:Date;
    created_at:Date;
    updated_at:Date;
    Remarks:string;
    Acknowledged:boolean;
    RequestedOn:Date;
    Status:string;
    paymentStatus:any;

}
