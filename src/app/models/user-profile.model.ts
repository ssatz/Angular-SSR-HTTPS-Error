/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { User } from './user.model';
import { BankAccountDetails } from './bank-details.model';
import { BankNames } from './bank-names.model';
export interface UserProfile {
    user: User;
    bank: BankAccountDetails;
    bankNames: BankNames;
}
