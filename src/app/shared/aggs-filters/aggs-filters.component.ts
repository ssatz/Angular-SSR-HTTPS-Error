import { CommonNotificationService } from './../service/common-notification.service';
import { Subscription ,  Observable } from 'rxjs';
import {
    Component, Input, OnInit, OnDestroy, Renderer2, Inject, AfterViewInit,
    Output, EventEmitter, ChangeDetectionStrategy,
    PLATFORM_ID
} from '@angular/core';
import { Aggregations } from '../../models/aggregation.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MaterializeAction } from 'angular2-materialize';
import * as Ps from 'perfect-scrollbar';
import { isNullOrUndefined } from 'util';


@Component({
    selector: 'cmp-aggsFilters',
    templateUrl: './aggs-filters.component.html',
    styles: [`.filter-height{
            max-height: 300px;
             position: relative;
            }
            .product-filter-accordion
            {
              margin-top:50px !important;
            }
            .product-filter-category
            {
              display:none !important;
            }
            `],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AggsFiltersComponent implements OnInit, AfterViewInit {
    @Input() aggsFilter: Observable<Aggregations>;
    @Input() category: Observable<string>;
    selectedFilters: Array<any> = new Array<any>();
    searchText: Array<Aggregations> = new Array<Aggregations>();
    @Output() filterSelected: EventEmitter<any> = new EventEmitter<any>();
    public collapsible = new EventEmitter<string | MaterializeAction>();
    private subscription: Subscription;

    constructor(private router: Router,
        private render: Renderer2,
        @Inject(DOCUMENT) private document: any,
        private notificationService: CommonNotificationService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private activateRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.activateRoute.params.subscribe((params: Params) => {
            this.selectedFilters = []; // navigate to a different page make it empty
            this.idSelection();
        });
        this.subscription = this.notificationService.notifyObservable$.subscribe((res) => {
            if (res.hasOwnProperty('action') && res.action === 'filter') {
                this.selectedFilters['psort'] = [res.value];
                this.queryPageNavigation();
            }
        });
        this.activateRoute.queryParams.subscribe((params: any) => {
            for (const key in params) {
                if (params[key] != null || params[key] !== '') {
                    if (!this.selectedFilters[key]) {
                        this.selectedFilters[key] = [];
                    }
                    const array = String(params[key]).split(',');
                    for (const data in array) {
                        if (data) {
                            const i = this.selectedFilters[key].indexOf(array[data]);
                            if (i === -1 && key !== 'Price') {
                                this.selectedFilters[key].push(array[data]);
                            }
                            if (key === 'Price' || key === 'page' || key === 'q' || key === 'psort') {
                                this.selectedFilters[key] = new Array(array[data]);
                            }
                        }
                    }
                }
            }
        });
    }

    ngAfterViewInit() {
        this.idSelection();
    }

    replaceSpace($value: string): string {
        let $string: string = $value.split(' ').join('-');
        $string = $string.split('&').join('');
        $string = $string.split('---').join('-');
        return $string.split('--').join('-').toLowerCase();
    }

    filterSelection(e, filter, keyData) {
        const filterValue = filter.key;
        if (!this.selectedFilters[keyData]) {
            this.selectedFilters[keyData] = [];
        }
        const i = this.selectedFilters[keyData].indexOf(filterValue);
        if (e.target.checked) {
            if (i === -1 && keyData !== 'Price') {
                this.selectedFilters[keyData].push(filterValue);
            }
            if (keyData === 'Price' || keyData === 'page' || keyData === 'q') {
                this.selectedFilters[keyData] = new Array(filterValue);
            }
        } else {
            this.selectedFilters[keyData].splice(i, 1);
        }
        for (const key in this.selectedFilters) {
            if (this.selectedFilters[key].length === 0) {
                delete this.selectedFilters[key];
            } else {
                this.selectedFilters[key] = this.selectedFilters[key].filter(Boolean);
            }
        }
        this.queryPageNavigation();
    }

    idSelection(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.collapsible.emit({ action: 'collapsible', params: ['expandable'] });
            let htmlCollection$: HTMLCollection;
            htmlCollection$ = this.document.getElementsByClassName('filter-height');
            for (let i = 0; i < htmlCollection$.length; i++) {
                setTimeout(function () {
                    Ps.initialize(htmlCollection$.item(i) as HTMLElement);
                }, 100);
            }
            for (const key in this.selectedFilters) {
                if (key) {
                    for (const filter in this.selectedFilters[key]) {
                        if (this.selectedFilters[key][filter].length > 0 && this.selectedFilters[key][filter] !== '') {
                            if (this.document.getElementById(this.replaceSpace(key + this.selectedFilters[key][filter])) != null) {
                                const attr$ = this.document.getElementById(this.replaceSpace(key + this.selectedFilters[key][filter]));
                                this.render.setAttribute(attr$, 'checked', 'checked');
                            }
                        }
                    }
                }
            }

            // hide category li for search screen
            const categoryHeader: HTMLElement = document.getElementById('product-filter-category') as HTMLElement;
            this.render.addClass(categoryHeader, 'product-filter-category');
        }
    }

    isDisabled(itemCount: number): any {
        if (itemCount === 0) {
            return 'disabled';
        }
        return;
    }

    private queryPageNavigation() {
        if (this.router.url.match('search')) {
            this.selectedFilters['page'] = [1]; // always do search from starting
            this.filterSelected.emit(this.selectedFilters);
            this.router.navigate(['search'], {
                queryParams: this.selectedFilters
            });
        } else {
            const slug$: string = this.activateRoute.snapshot.params['slug'];
            let filter$: string = this.activateRoute.snapshot.params['filter'];
            filter$ = isNullOrUndefined(filter$) ? '' : '/' + filter$;
            const pager$ = isNullOrUndefined(this.activateRoute.snapshot.params['pager']) ? 1 : this.activateRoute.snapshot.params['pager'];
            if (pager$ === 1) {
                this.filterSelected.emit(this.selectedFilters);
            }
            this.router.navigate([slug$ + filter$ + '/.'], {
                queryParams: this.selectedFilters
            });
        }
    }
}
