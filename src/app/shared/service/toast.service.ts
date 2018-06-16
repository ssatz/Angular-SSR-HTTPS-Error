/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Injectable} from '@angular/core';
declare let Materialize: any;

export  class ToastNotificationColor {

    static  readonly  INFO: string = '#1e88e5 blue darken-1';
    static readonly   ERROR: string = '#e53935 red darken-1';
    static readonly   SUCCESS: string = '#00897b teal darken-1';
}

@Injectable()
export class ToastService{


    showToast(message:string,toastColor:ToastNotificationColor= ToastNotificationColor.SUCCESS,
              duration?:number,callback?:Function){

        if(duration) {
            Materialize.toast(message,duration,toastColor);
            return;
        }

        if(callback) {
            Materialize.toast(message,duration,toastColor,callback);
            return;
        }

        Materialize.toast(message,4000,toastColor);
        return;
    }
}
