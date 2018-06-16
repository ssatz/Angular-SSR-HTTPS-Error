
import {pluck} from 'rxjs/operators';
/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as Clipboard from 'clipboard';
import {ToastService, ToastNotificationColor} from '../../shared/service/toast.service';
import {NgForm} from '@angular/forms';
import {ReferralService} from '../../shared/service/referral.service';


@Component({
    selector: 'referral-cmp',
    templateUrl: './referral.component.html',
})



export class ReferralComponent implements OnInit {
    public url;
    public referrals;
    public referral = 'Hi, I am using www.paisaclub.com and getting cashback for online purchases. ' +
        'Join using below link. http://www.paisaclub.com/register/referral/1';
    constructor(private route: ActivatedRoute,
                private toastService:ToastService,
                private referralService:ReferralService) {
        this.referrals = this.route.data.pipe(pluck('referralData','referral','referrals'));
        this.url = this.route.data.pipe(pluck('referralData','referral','url'));

    }

    ngOnInit() {
        let dat$ = new Clipboard(document.getElementById('btn-copy'));
        dat$.on('success', function(e) {
            let html$ = '<span><i class="mdi-action-announcement text-color-white"></i>Text Copied to clipboard</span>';
            this.toastService.showToast(html$,ToastNotificationColor.INFO)
            e.clearSelection();
        },this);  //this will be available in callback function

    }

    sendInvite(form:NgForm){
        if(form.submitted && form.valid && !form.errors) {
            this.referralService.sendInvite(form.value).subscribe((data)=>{
              if(data.status){
                  this.toastService.showToast('Invitation Sent',ToastNotificationColor.SUCCESS);
                 let email$ = document.getElementById('email') as HTMLInputElement;
                 email$.value = '';
              }
            });
        }
    }
}
