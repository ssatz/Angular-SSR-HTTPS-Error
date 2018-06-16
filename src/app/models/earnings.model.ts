/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Transaction } from './transaction.model';
import {ActionItem} from "./action-item.model";

export interface Earnings {
    Referrals: number;
    EarningsApproved: number;
    PurchaseList: Transaction[];
    EarningPendingForApproval: number;
    BalancePayable: number;
    PaymentRequested: number;
    Paid: number;
    CashbackApprovalPeriod: any;
    ActionItems:ActionItem[];
    TotalTransactions:number;
}
