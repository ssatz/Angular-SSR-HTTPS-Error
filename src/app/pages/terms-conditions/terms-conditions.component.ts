/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { Component } from '@angular/core';
import {SeoService, MetaTagsForPages} from '../../shared/service/seo.service';


@Component({
    selector: 'sg-termsconditions',
    templateUrl:'./terms-conditions.component.html',
    styles:[".content{color:#777;font-family: 'Play',sans-serif;font-size: 14px!important;}"]
})

export class TermsConditionsComponent {
    constructor(private seoService: SeoService) {
        this.seoService.setTitle('ForgotPassword - Paisaclub.com');
        this.seoService.setMetaTag(MetaTagsForPages.DESCRIPTION, 'Paisaclub.com - Terms & Conditions');
    }
}

