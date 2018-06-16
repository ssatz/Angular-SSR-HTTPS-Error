/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Component } from '@angular/core';
import {SeoService,MetaTagsForPages} from '../../shared/service/seo.service';


@Component({
    selector: 'about-us',
    templateUrl:'./about-us.component.html',
    styleUrls:['./about-us.component.scss']
})

export class AboutUsComponent{
constructor(private seoService : SeoService)
{
    this.seoService.setTitle('About Us - Paisaclub.com Earn & Spend Money, Mobile Recharge!');
    this.seoService.setMetaTag(MetaTagsForPages.DESCRIPTION,'Paisaclub.com - About Us');
}
}
