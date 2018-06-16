import { CommonNotificationService } from './../service/common-notification.service';
import { ActivatedRoute, Router, Params, RouterEvent, NavigationEnd } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'app-searchbox-cmp',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchBoxComponent implements OnInit {
    public searchQuery: string;
    constructor(private activatedRoute: ActivatedRoute,
        private notificationService: CommonNotificationService,
        private router: Router) {
    }

    ngOnInit() {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationEnd) {
                if (isNullOrUndefined(this.router.url.match('/search'))) {
                    this.searchQuery = '';
                }
            }
        });
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            if (this.router.url.match('search')) {
                this.searchQuery = params['q'];
            }
        });
    }
    searchBtn() {
        this.router.navigate(['search'], {
            queryParams: { q: this.searchQuery }
        });
        this.notificationService.notifyOther({
            option: 'search',
            value: String(this.searchQuery)
        });
    }
}
