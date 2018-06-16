/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Component, AfterViewInit, OnDestroy, NgZone} from "@angular/core";
import {SeoService, MetaTagsForPages} from "../shared/service/seo.service";
import {AuthenticationService} from '../shared/service/authentication.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'register-cmp',
    templateUrl: './register.component.html',
})

export class RegisterComponent implements AfterViewInit,OnDestroy  {
    private subscription: Subscription = new Subscription();
    constructor(
                 private router:Router,
                 private seoService:SeoService,
                 private authService:AuthenticationService,
                 private zone:NgZone) {

        this.seoService.setTitle('Paisaclub.com - Earn & Spend Money, Mobile Recharge!');
        this.seoService.setMetaTag(MetaTagsForPages.DESCRIPTION,'Paisaclub.com - Register');
    }
    ngAfterViewInit() {
        this.subscription = this.authService.isAuthenticated.subscribe((auth:boolean)=>{
            if(auth){
                this.zone.run(()=> {
                    this.router.navigate(['/myaccount/home'])
                });
            }
        });
        }
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}


