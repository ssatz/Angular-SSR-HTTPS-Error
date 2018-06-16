/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyAccountComponent } from './myaccount.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';
import { ReferralComponent } from './referral/referral.component';
import { ProfileResolver } from './profile/profile.resolver';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaymentResolver } from './payment/payment.resolver';
import { ReferralResolver } from './referral/referral.resolver';
import { HomeRoutingModule } from './home/home.routing';
import { PaymentRoutingModule } from './payment/payment.routing';
import { UserProfileRoutingModule } from './profile/profile.routing';
import { ReferralRoutingModule } from './referral/referral.routing';
import { MyAccountResolver } from './my-account.resolver';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        PaymentRoutingModule,
        UserProfileRoutingModule,
        ReferralRoutingModule,
        FormsModule
    ],
    providers: [MyAccountResolver, ProfileResolver, PaymentResolver, ReferralResolver],
    declarations: [MyAccountComponent, HomeComponent, ProfileComponent, PaymentComponent, ReferralComponent],
    exports: [MyAccountComponent,
        HomeComponent,
        SharedModule,
        ProfileComponent,
        PaymentComponent,
        ReferralComponent,
        ReactiveFormsModule,
        FormsModule]
})

export class MyAccountModule { }
