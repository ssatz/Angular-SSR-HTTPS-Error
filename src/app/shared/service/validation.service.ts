/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup, FormControl} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {FormError} from '../../models/form-error.model';

@Injectable()
export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'invalidMobile': 'Invalid mobile number',
            'invalidString' : 'Provide a meaningful name',
            'invalidAccountNo': 'Please provide a valid Account No!',
            'invalidIFSC': 'Please provide a valid IFSC code!',
            'invalidNotMatched':'AccountNumber & Confirm Account number not matched',
            'invalidNotPassword':'Password & confirm Password not matched',
            'checkboxRequired':'Confirm Bank Account by check the checkbox',
            'invalidAmount':'Amount should be above Rs.10',
            'invalidstdcode':'Please provide a valid StdCode',
            'invalidLandLine':'Please provide a valid LandLine'
        };

        return config[validatorName];
    }

    static stdCodeValidator(control:FormControl){
        if(isNullOrUndefined(control.value)){return null;}
        //let val = control.value.match?control.value: String(control.value);
        if (control.value.match(/^0\d{2,6}$/gm)) {
            return null;
        } else {
            return { 'invalidstdcode': true };
        }
    }

    static landLineValidator(control:FormControl){
        if(isNullOrUndefined(control.value)){return null;}
        let val = control.value.match?control.value: String(control.value);
        if (val.match(/[0-9]{6,8}/g)) {
            return null;
        } else {
            return { 'invalidLandLine': true };
        }
    }

    static creditCardValidator(control:FormControl) {
        if(isNullOrUndefined(control.value)){return null;}
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }

    static accountNumberValidator(control:FormControl){
        if(isNullOrUndefined(control.value)){return null;}
        let val = control.value.match?control.value: String(control.value);

        if (val.match(/^[0-9]*$/)) {
            return null;
        } else {
            return { 'invalidAccountNo': true };
        }
    }
    static amountValidator(control:FormControl){
        if(isNullOrUndefined(control.value)){return null;}
        let val = control.value.match?control.value: String(control.value);

        if (val.match(/^[1-9][0-9]{1,5}$/)) {
            return null;
        } else {
            return { 'invalidAmount': true };
        }
    }
    static IFSCValidator(control:FormControl){
        if(isNullOrUndefined(control.value)){return null;}
        if (control.value.match(/^[^\s]{4}\d{7}$/)) {
            return null;
        } else {
            return { 'invalidIFSC': true };
        }
    }

    static emailValidator(control:FormControl) {
        if(isNullOrUndefined(control.value)){return null;}
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control:FormControl) {
        if(isNullOrUndefined(control.value)){return null;}
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
    static mobileValidator(control:FormControl) {
        if(isNullOrUndefined(control.value)){return null;}
        let val = control.value.match?control.value: String(control.value);

        if (val.match(/^[789]\d{9}$/)) {
            return null;
        } else {
            return { 'invalidMobile': true };
        }
    }

    static checkboxRequired(control:FormControl){
        if(isNullOrUndefined(control.value)){return null;}
        if (control.value) {
            return null;
        } else {
            return { 'checkboxRequired': true };
        }
    }

    static stringValidator(control:FormControl) {
        if(isNullOrUndefined(control.value)){return null;}
        if (control.value.match(/^[A-Za-z ]+$/)) {
            return null;
        } else {
            return { 'invalidString': true };
        }
    }
    /* Remote Validation message to display*/
    static getRemoteValidationMsg(message){
        return message;
    }

    static accountNumberConfirmValidator(controls){
            if (controls.value.AccountNumber === controls.value.ConfirmAccountNumber) {
                return null;
            } else {
                return {'invalidNotMatched': true};
            }
    }
    static passwordConfirmValidator(controls){
        if (controls.value.password === controls.value.confirm_password) {
            return null;
        } else {
            return {'invalidNotPassword': true};
        }
    }

    static findFieldControl(field: string, form: FormGroup): AbstractControl {
        let control: AbstractControl;
        if (field === 'base') {
            control = form;
        } else if (form.contains(field)) {
            control = form.get(field);
        } else if (field.match(/_id$/) && form.contains(field.substring(0, field.length - 3))) {
            control = form.get(field.substring(0, field.length - 3));
        } else if (field.indexOf('.') > 0) {
            let group = form;
            field.split('.').forEach((f) => {
                if (group.contains(f)) {
                    control = group.get(f);
                    if (control instanceof FormGroup) group = control;
                } else {
                    control = group;
                }
            })
        } else {
            // Field is not defined in form but there is a validation error for it, set it globally
            control = form;
        }
        return control;
    }

    static fetchFieldErrors(data: any, field: string): any {
        const errors = {};
        if(!isNullOrUndefined(data[field].length) && typeof data[field].forEach === "function") {
            data[field].forEach((e) => {
                errors[field] = e;
            });
        }
        return errors;
    }

    /* Remote Validation */
    static remoteValidation(data, form:FormGroup):any{
        const fields = Object.keys(data || {});
        fields.forEach((field) => {
            const control = ValidationService.findFieldControl(field,form);
            const errors = ValidationService.fetchFieldErrors(data, field);
            control.setErrors(errors);
        });
    }

    static getErrors(control: AbstractControl): FormError[] {
        return Object.keys(control.errors)
            .filter((error) => control.errors[error])
            .map((error) => {
                let params = control.errors[error];
                return {
                    error: error,
                    params: params === true || params == {} ? null : params
                };
            });
    }
}
