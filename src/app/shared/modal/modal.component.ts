/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */


import { Component, OnDestroy, OnInit, EventEmitter, Input } from '@angular/core';
import { CommonNotificationService } from '../service/common-notification.service';
import { Subscription } from 'rxjs';
import { MaterializeAction } from 'angular2-materialize';
@Component({
    selector: 'modal-cmp',
    templateUrl: './modal.component.html',
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() content;
    private subscription: Subscription;
    modalActions = new EventEmitter<string | MaterializeAction>();
    public constructor(private notificationService: CommonNotificationService) { }
    ngOnInit() {
        this.subscription = this.notificationService.notifyObservable$.subscribe((res) => {
            if (res.hasOwnProperty('option') && res.option === 'modal') {
                if (res.value === 'open') {
                    this.openModal();
                    return;
                }
                this.closeModal();
            }
        });

    }

    closeModal() {
        this.modalActions.emit({ action: 'modal', params: ['close'] });
    }
    openModal() {
        this.modalActions.emit({ action: 'modal', params: ['open'] });
    }
    ngOnDestroy() {
        this.closeModal();
        this.subscription.unsubscribe();
    }
}
