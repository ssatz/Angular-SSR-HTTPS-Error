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


@Component({
    selector: 'faq-cmp',
    templateUrl: './faq.component.html',

})
export class FAQComponent {
    public faqs: Observable<FAQ[]>;

    constructor(private _activatedRoute: ActivatedRoute) {
        console.log(this._activatedRoute.snapshot.data['faqs']);
        this.faqs = this._activatedRoute.snapshot.data['faqs'];
    }
}
