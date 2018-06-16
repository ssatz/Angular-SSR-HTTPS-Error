/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

export class User  {
    password: string;
    remember_me: boolean;
    email: string;
    name: string;
    is_active: boolean;
    mobile: number;
    referral_id: number;
    role_id: number;
    id: number;
    active: number;
    DOB: Date;
    EmailVerificationCode: number;
    MobileVerificationCode: number;
    EmailVerified: boolean;
    MobileVerified: boolean;
    created_at: any;
    updated_at: any;
    MobileCodeSentAt: any;
    IsDeleted: boolean;
    DownloadLinkSentAt: any;
    joining_bonus:number;
    is_joiningbonus_eligible: boolean;
    is_joiningbonus_added: boolean;
    updated: void;
}

