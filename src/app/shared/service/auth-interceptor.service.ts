
import {catchError} from 'rxjs/operators';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable, Inject, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { DOCUMENT } from '@angular/common';
import { isNullOrUndefined } from 'util';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private router: Router;
    constructor(private localStorageService: LocalStorageService,
        private inj: Injector,
        @Inject(DOCUMENT) private document: any) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        req = req.clone({ headers: req.headers.set('App-auth', this.document.querySelectorAll('meta[name="app-auth"]')[0].content) });
        const token: string = this.localStorageService.getItem('access_token');
        if (!isNullOrUndefined(token)) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }
        this.router = this.inj.get(Router);
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 404:
                            this.router.navigate(['404-page-not-found']);
                            break;
                        case 500:
                            this.router.navigate(['500-error']);
                            break;
                        case 401:
                            this.handle401Error();
                            break;
                    }
                }
                return observableThrowError(error);
            }));
    }

    handle401Error() {
        this.localStorageService.removeItem('access_token');
        this.localStorageService.removeItem('expires_in');
        this.router.navigate(['login']);
    }
}
