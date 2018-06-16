/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from './service/validation.service';
import {isNullOrUndefined} from 'util';



@Component({
    selector: 'control-messages',
    template: `<div class="error mdi-alert-error" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})

export class FormControlMessagesComponent {
    @Input() control: FormControl;
    constructor() {
    }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
              if(isNullOrUndefined(ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName])))
              {

                  return ValidationService.getRemoteValidationMsg(this.control.errors[propertyName]);
              }
              else {

                  return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
              }
            }
        }
        return null;
    }
}
