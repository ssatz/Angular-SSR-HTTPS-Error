import { Component, AfterViewInit, EventEmitter, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterEvent, NavigationEnd } from '@angular/router';
import { CommonNotificationService } from '../service/common-notification.service';
import { isNullOrUndefined } from 'util';


@Component({
    selector: 'sg-header',
    templateUrl: './header.component.html',
    styles: [`.header-search-wrapper .btn{
    position: relative;
    cursor: pointer;
    font-size: 24px;
    top: -60px;
    height: 40px;
    display: inline-block;
    left: -1px;
    float: right;
    line-height: 32px!important;
    -webkit-transition: color .2s ease;
    transition: color .2s ease;
    width: 70px;
}
header-search-wrapper .i{
left:24px;
}`]
})

export class HeaderComponent implements OnInit {
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


    logout($event): void {
        $event.preventDefault();
        this.notificationService.notifyOther({ option: 'logout', value: 'open', event: $event });
    }

    login($event): void {
        $event.preventDefault();
        this.notificationService.notifyOther({ option: 'login', value: 'open', event: $event });
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

