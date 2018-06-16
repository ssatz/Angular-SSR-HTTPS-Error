
import {interval as observableInterval, fromEvent as observableFromEvent, Observable} from 'rxjs';

import {switchMap, distinctUntilChanged, throttle, filter, map, merge} from 'rxjs/operators';






import {OfferService} from './offer.service';
import {ElementRef, Injectable} from '@angular/core';

@Injectable()
export class SearchService {

    search(element: ElementRef, event: string, offerSearch: OfferService, isMobile = false) {
        let observableEvents = observableFromEvent<any>(element.nativeElement, event);
        if (isMobile) {
            let input = observableFromEvent<any>(element.nativeElement, 'input');
            let blur = observableFromEvent<any>(element.nativeElement, 'blur');
            let keydown = observableFromEvent<any>(element.nativeElement, 'touchstart');
            observableEvents.pipe(merge(input, blur, keydown));
        }
        let focusout = observableFromEvent<any>(element.nativeElement, 'focusout');
        observableEvents.pipe(merge(focusout));

        return observableEvents.pipe(
            map(function (e) {
                return e.target.value; // Project the text from the input
            }),
            filter(function (text) {
                return text.length > 2; // Only if the text is longer than 2 characters
            }),
            throttle(ev => observableInterval(600)),
            distinctUntilChanged(), // Only if the value has changed
            switchMap(term => offerSearch.searchOfferByName(term)),); // Ensure no out of order results
    }

    formatSEOName($name: string): string {
        let $seo = $name.replace(/\.com/g, '');
        $seo = $seo.replace(/\.co.in/g, '');
        $seo = $seo.replace(/\.in/g, '');
        $seo = $seo.replace(/\./g, '');
        $seo = $seo.replace(/\,/g, '-');
        $seo = $seo.replace(/\ /g, '-');
        $seo = $seo.replace(/\--/g, '-');
        $seo = $seo.replace(/\---/g, '-');
        return $seo;
    }
}