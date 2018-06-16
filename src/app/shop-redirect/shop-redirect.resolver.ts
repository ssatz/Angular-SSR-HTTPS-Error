import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {OfferService} from '../shared/service/offer.service';




@Injectable()
export class ShopRedirectResolver implements Resolve<any> {
    constructor(
        private offerService: OfferService
    ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.offerService.offerRedirectShop(route.params['storeSlug']);
    }
}
