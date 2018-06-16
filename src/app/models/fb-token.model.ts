/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

export interface FacebookToken {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: number;
    provider: string;
    referralId:number;
}