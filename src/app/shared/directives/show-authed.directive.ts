/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Directive({ selector: '[showAuthed]' })
export class ShowAuthedDirective implements OnInit {
    condition: boolean;
    constructor(
        private templateRef: TemplateRef<any>,
        private auth: AuthenticationService,
        private viewContainer: ViewContainerRef
    ) {}

    ngOnInit() {
        this.auth.isAuthenticated.subscribe(
            (isAuthenticated) => {
                if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            }
        );
    }

    @Input() set showAuthed(condition: boolean) {
        this.condition = condition;
    }

}
