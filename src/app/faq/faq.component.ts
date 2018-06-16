/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {FAQ} from '../models/faq.model';
import {SeoService, MetaTagsForPages} from '../shared/service/seo.service';


@Component({
    selector: 'faq-cmp',
    templateUrl: './faq.component.html',

})
export class FAQComponent {
    public faqs: Observable<FAQ[]>;

    constructor(private _activatedRoute: ActivatedRoute, private seoService: SeoService) {
        this.seoService.setTitle('FAQ - Earn & Spend Money, Mobile Recharge!');
        this.seoService.setMetaTag(MetaTagsForPages.DESCRIPTION, 'Paisaclub.com - FAQ');
        this.faqs = this._activatedRoute.snapshot.data['faqs'];
    }
}