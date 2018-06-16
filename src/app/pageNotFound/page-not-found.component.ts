import { ServerResponseService } from './../shared/service/server-response.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit {

    constructor(private location: Location,
        private router: Router,
        private serverRes: ServerResponseService) {
    }

    ngOnInit() {
        this.serverRes.setCacheNone();
        this.serverRes.setNotFound();
    }

    goBack() {
        this.location.back();
    }
}
