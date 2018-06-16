/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LaddaButtonSpinnerService} from '../../shared/service/LaddaButtonSpinnerService';
import {ToastService, ToastNotificationColor} from '../../shared/service/toast.service';
import {FAQService} from '../../shared/service/faq.service';
import {SeoService, MetaTagsForPages} from '../../shared/service/seo.service';


@Component({
    selector: 'contact-us',
    templateUrl: './contact-us.component.html',
    styles: ['div.error{left: 0.8rem !important;}']
})

export class ContactUsComponent implements OnInit {

    contactModel: any = {};

    constructor(private laddaButtonService: LaddaButtonSpinnerService,
                private toastSerive: ToastService,
                private faqService: FAQService,
                private seoService: SeoService) {
        this.seoService.setTitle('Contact Us - Earn & Spend Money, Mobile Recharge!');
        this.seoService.setMetaTag(MetaTagsForPages.DESCRIPTION, 'Paisaclub.com - Contact Us,Earn & Spend Money, Mobile Recharge!');
    }

    ngOnInit() {
        this.laddaButtonService.create('contact-btn');
    }

    saveContactUs($form: NgForm): void {
        $form.form.markAsTouched();
        if ($form.valid) {
            this.laddaButtonService.start();
            this.faqService.contactUs(this.contactModel).subscribe((data: any) => {
                if (data.status) {
                    this.toastSerive.showToast('Our support team will contact you in 24hrs', ToastNotificationColor.SUCCESS);
                    $form.reset();
                    for (let propertyName in $form.control.controls) {
                        $form.control.get(propertyName).setErrors(null);
                        $form.control.get(propertyName).markAsUntouched();
                        $form.control.get(propertyName).clearValidators();
                        $form.control.get(propertyName).clearAsyncValidators();
                    }
                    $form.form.markAsUntouched();
                    $form.form.clearValidators();
                    $form.form.clearAsyncValidators();
                    this.laddaButtonService.stop();
                    return;
                }
                this.toastSerive.showToast('Problem With our Mail Server, Please write to care@paisaclub.com', ToastNotificationColor.ERROR)
                this.laddaButtonService.stop();
            });
        }

    }
}
