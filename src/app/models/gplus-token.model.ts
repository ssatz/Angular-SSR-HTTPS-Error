/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

export interface GooglePlusToken {
    access_token: string;
    expires_at: any;
    expires_in: any;
    first_issued_at: number;
    id_token: string;
    idpId: string;
    login_hint: string;
    provider: string;
    referralId:number;
}