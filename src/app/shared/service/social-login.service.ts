/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import {FacebookToken} from "../../models/fb-token.model";
import {GooglePlusToken} from "../../models/gplus-token.model";
import {DOCUMENT} from '@angular/common';
import {AppConfig} from './app-config.service';


declare let FB: any;
declare let gapi: any;
@Injectable()
export class SocialLoginService {
    gauth: any;
    constructor(@Inject(DOCUMENT) document: any,private config:AppConfig) {
        this.loadAndInitFBSDK();
        this.loadAndIntiGPlusSDK();
    }

    loadAndInitFBSDK() {
        let d = document, fbJs, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        fbJs = d.createElement('script');
        fbJs.id = id;
        fbJs.async = true;
        fbJs.src = '//connect.facebook.net/en_US/sdk.js';

        fbJs.onload = function () {
            FB.init({
                appId: this.config.getConfig('fb_appid'),
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.8'
            });
        }.bind(this);

        ref.parentNode.insertBefore(fbJs, ref);
    }
    loadAndIntiGPlusSDK() {
        let d = document, gJs, ref = d.getElementsByTagName('script')[0];
        gJs = d.createElement('script');
        gJs.async = true;
        gJs.defer = true;
        gJs.src = '//apis.google.com/js/platform.js';
        gJs.onload = function () {
            gapi.load('auth2', function () {
                gapi.auth2.init({
                    client_id: this.config.getConfig('gplus_clientid'),
                    scope: 'email profile openid'
                });
            }.bind(this));
        }.bind(this);
        ref.parentNode.insertBefore(gJs, ref);
    }

    auth(provider: string): Observable<any> {
        return Observable.create(
            (observer) => {
                switch (provider) {
                    case 'fb':
                        FB.getLoginStatus(function (response) {
                            if (response.status === 'connected') {
                                let auth_token: FacebookToken;
                                auth_token = response.authResponse;
                                auth_token.provider = new Provider().FB;
                                observer.next(auth_token);
                                observer.complete();
                            } else if (response.status === 'not_authorized') {
                                fbLogin(observer);
                            } else {
                                fbLogin(observer);
                            }
                        });
                        break;

                    case 'gplus':
                        if (typeof(this.gauth) === 'undefined') {
                            this.gauth = gapi.auth2.getAuthInstance();
                        }
                        this.gauth.signIn().then(() => {
                            let auth_token: GooglePlusToken;
                            auth_token = this.gauth.currentUser.get().getAuthResponse();
                            auth_token.provider = new Provider().GPLUS;
                            observer.next(auth_token);
                            observer.complete();
                        });
                }
            });
    }
    fbShare():void{
        FB.ui({
            method: 'share',
            display: 'popup',
            href: document.location.href,
        }, function (response) {
        });
    }
}

   function fbLogin(observer) {
        FB.login(function (response) {
            if (response.status === 'connected') {
                let auth_token: FacebookToken;
                auth_token = response.authResponse;
                auth_token.provider = new Provider().FB;
                observer.next(auth_token);
                observer.complete();
            }
        });
    }


export class Provider {
   public FB = 'facebook';
   public GPLUS = 'google';
}
