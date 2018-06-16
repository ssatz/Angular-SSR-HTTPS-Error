/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { BankNames } from './bank-names.model';
export class BankAccountDetails {
    id: number;
    AccountHolderName: string;
    AccountNumber: number;
    AccountNumber_confirmation: number;
    AccountNumberGroup: any;
    Branch: string;
    IFSC_Code: any;
    BankName: BankNames;
    updated: Date;
    BankId: number;
}
