/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {AuthToken} from './auth-token.model';
export interface SocialLogin{
    token:AuthToken;
    error:string;
    status:boolean;
    code:number;
}
