import { ServerResponseService } from './../service/server-response.service';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-server-error',
    templateUrl: './server-error.component.html',
    styleUrls: ['./server-error.component.scss']
})

export class ServerErrorComponent implements OnInit {
    constructor(private serverRes: ServerResponseService) { }
    ngOnInit() {
        this.serverRes.setCacheNone();
        this.serverRes.setError();
    }
}
