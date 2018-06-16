
import {distinctUntilChanged,  shareReplay, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Observable ,  ReplaySubject ,  BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { OAuthHttpService } from './oAuth-http.service';
import { AuthToken } from '../../models/auth-token.model';
import { UserService } from './user.service';
import { User } from '../../models/user.model';
import { DOCUMENT } from '@angular/common';
import { GlobalService } from './globals.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
    public currentToken: string;
    constructor(private localStorageService: LocalStorageService,
        private globalService: GlobalService,
        private oauthHttpService: OAuthHttpService,
        @Inject(DOCUMENT) private document: any,
        private userInfo: UserService) {
        this.readAuthenticationFromStorage();
    }

    login(username: string, password: string): Observable<boolean> {
        return this.oauthHttpService.login(this.globalService.API + '/api/v1/login',
            this.oAuth2RequestBody(username, password),
            { headers: this.oAuthRequestOptions(), withCredentials: true })
            .pipe(
            shareReplay(),
            map((token: any) => {
                if (token) {
                    this.storeAuthentication(token);
                    return true;
                }
                return false;
            })
            );
    }

    logout(): void {
        this.oauthHttpService.get(this.globalService.API + '/api/v1/logout')
            .subscribe((res: any) => {
                this.localStorageService.removeItem('access_token');
                this.localStorageService.removeItem('expires_in');
                this.currentUserSubject.next(new User());
                this.isAuthenticatedSubject.next(false);
            });
    }

    readAuthenticationFromStorage(): void {
        const access_token = this.localStorageService.getItem('access_token');
        if (access_token !== null && typeof (access_token) !== 'undefined') {
            this.storeUserDetails(access_token);
        } else {
            this.isAuthenticatedSubject.next(false);
        }
    }

    storeAuthentication(authToken: AuthToken) {
        this.currentToken = authToken.access_token;
        this.localStorageService.setItem('access_token', authToken.access_token);
        this.localStorageService.setItem('expires_in', authToken.expires_in);
        this.storeUserDetails(authToken.access_token);
    }

    storeUserDetails(accessToken: string): void {
        this.userInfo.getUserInfo().subscribe((user) => {
            this.currentUserSubject.next(user);
            this.isAuthenticatedSubject.next(true);
        },
            (error) => {
                this.logout();
            }
        );
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    getAuthToken(): string {
        this.currentToken = this.localStorageService.getItem('access_token');
        return this.currentToken;
    }

    oAuth2RequestBody(userName: string, password: string): string {
        const body = `email=${userName}`
            + `&password=${password}`;
        return body;
    }

    oAuthRequestOptions() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'App-Auth': this.document.querySelectorAll('meta[name="app-auth"]')[0].content,
            'Accept': 'application/json'
        });
        return headers;
    }

    refreshToken(): Observable<any> {
        return this.oauthHttpService.post(this.globalService.API + '/api/v1/login/refresh', {});
    }

}
