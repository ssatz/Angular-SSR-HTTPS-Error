/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

export class Password{
    password :any;
    current_password:any;
    password_confirmation:any;

    constructor($password:any){
        this.current_password = $password.current_password;
        this.password = $password.password_group.password;
        this.password_confirmation = $password.password_group.confirm_password;
    }
}


