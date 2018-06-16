import { ProductService } from './../shared/service/product.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class ProductRedirectResolver implements Resolve<any> {
    constructor(
        private productService: ProductService
    ) { }
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.productService.productRedirectShop(route.params['storeSlug'], route.queryParams);
    }
}
