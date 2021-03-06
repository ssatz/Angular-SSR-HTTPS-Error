
import {of as observableOf, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {FAQService} from '../shared/service/faq.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
const FAQ_KEY = makeStateKey<any>('faq.result');
@Injectable()
export class FAQResolver implements Resolve<any> {
    private result: any;

    constructor(private _faqService: FAQService, private readonly transferState: TransferState) {
    }

    resolve(_route: ActivatedRouteSnapshot): Observable<any> {
        const found = this.transferState.hasKey(FAQ_KEY);
        if (found) {
            const res = observableOf(this.transferState.get<any>(FAQ_KEY, null));
            this.transferState.remove(FAQ_KEY);
            return res;
        }
        this.transferState.onSerialize(FAQ_KEY, () => this.result);
        return this._faqService.getFAQs().pipe(
            tap(result => this.result = result));
    }
}