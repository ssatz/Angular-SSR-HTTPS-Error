/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AboutUsRoutingModule} from './about-us/about-us.route';
import {AboutUsComponent} from './about-us/about-us.component';
import {PagesComponent} from './pages.component';
import {ContactUsRoutingModule} from './contact-us/contact-us.route';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {TermsConditionsComponent} from './terms-conditions/terms-conditions.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {TermsConditionsRoutingModule} from './terms-conditions/terms-conditions.route';
import {PrivacyPolicyRoutingModule} from './privacy-policy/privacy-policy.route';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        AboutUsRoutingModule,
        ContactUsRoutingModule,
        TermsConditionsRoutingModule,
        PrivacyPolicyRoutingModule
    ],
    providers: [],
    declarations: [PagesComponent,
        ContactUsComponent,
        TermsConditionsComponent,
        PrivacyPolicyComponent,
        AboutUsComponent],
    exports: [PagesComponent,
        AboutUsComponent,
        TermsConditionsComponent,
        PrivacyPolicyComponent,
        ContactUsComponent]
})

export class PagesModule {
}
