/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Component, OnInit, Input} from '@angular/core';
import {FormError} from '../models/form-error.model';



@Component({
    selector: 'app-form-errors',
    template: `
            <div id="card-alert" class="card red">
                      <div *ngFor="let e of errors" class="card-content white-text">
                        <p><i class="mdi-alert-error"></i>{{e.error.toUpperCase()}}:{{e.params}}</p>
                      </div>
                 </div>
  `
})
export class FormErrorsComponent implements OnInit {

    @Input() errors: FormError[];

    constructor() {

    }

    ngOnInit() {
    }



}
