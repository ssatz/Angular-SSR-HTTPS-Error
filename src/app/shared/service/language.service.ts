/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { Injectable } from '@angular/core';

@Injectable()

export class LanguageService{

      get TOAST_UPDATE_SUCCESS():string
      { return 'Hooray! Updated Successfully';
      }
      set TOAST_UPDATE_SUCCESS($service) {
          this.TOAST_UPDATE_SUCCESS = 'Hooray! '+$service+' Updated Successfully';
      }
      get TOAST_UPDATE_FAILED():string {
          return "Oops! Please Correct Error";
      }
      set TOAST_UPDATE_FAILED($service) {
          this.TOAST_UPDATE_SUCCESS = 'Oops! '+$service+' .Please Correct Error';
      }
}
