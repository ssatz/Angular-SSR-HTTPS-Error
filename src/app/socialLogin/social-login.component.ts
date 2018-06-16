/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { Component, ChangeDetectionStrategy, Output, EventEmitter, NgZone } from '@angular/core';
import { SocialLoginService } from '../shared/service/social-login.service';
import { UserService } from '../shared/service/user.service';
import { AuthenticationService } from '../shared/service/authentication.service';
import { AuthToken } from '../models/auth-token.model';
import { CommonNotificationService } from '../shared/service/common-notification.service';
import { SocialLogin } from '../models/social-login.model';
import { ToastService, ToastNotificationColor } from '../shared/service/toast.service';
import { LaddaButtonSpinnerService } from '../shared/service/LaddaButtonSpinnerService';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
    selector: 'social-login-cmp',
    templateUrl: './social-login.component.html',
    styles: [`
                .ladda-button{padding: 2px 100px !important;background: none;}
                @media only screen and (max-device-width: 600px) and (min-device-width: 320px) {
                    .ladda-button{padding: 2px 40px !important;background: none;}
                    .loginBtn--facebook{width: 85% !important;}
                    .loginBtn--google{width: 85% !important;}
                }
           `],
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class SocialLoginComponent {
    @Output() progressBar = new EventEmitter<boolean>();
    private referralId: number;
    constructor(private socialLoginService: SocialLoginService,
        private userService: UserService,
        private zone: NgZone,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private notificationService: CommonNotificationService,
        private toastNotification: ToastService,
        private authService: AuthenticationService,
        private laddaBtnService: LaddaButtonSpinnerService) {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.referralId = params['userid'];
        });
    }

    register(provider: string) {
        this.laddaBtnService.create(provider);
        this.laddaBtnService.start();
        this.socialLoginService.auth(provider).subscribe((authToken: any) => {
            authToken.referralId = this.referralId;
            if (provider === 'fb') {
                this.userService.createFbUser(authToken).subscribe((data: SocialLogin) => {
                    if (data.status) {
                        this.zone.run(() => {
                            this.auth(data.token);
                            this.toastNotification.showToast('You are logged in using Facebook', ToastNotificationColor.SUCCESS);
                        });

                    }
                },
                    (error) => {
                        this.handleError(error);
                    }
                );
            } else {
                this.userService.createGplusUser(authToken).subscribe((data: SocialLogin) => {
                    if (data.status) {
                        this.zone.run(() => {
                            this.auth(data.token);
                            this.toastNotification.showToast('You are logged in using Google+', ToastNotificationColor.SUCCESS);
                        });

                    }
                },
                    (error) => {
                        this.handleError(error);
                    });
            }
        });
    }

    auth(authToken: AuthToken) {
        this.authService.storeAuthentication(authToken);
        this.notificationService.notifyOther({ option: 'login', value: 'close', event: new Event('click') });
        this.laddaBtnService.stop();
        this.progressBar.emit(false);
        if (this.route.url !== '/recharge-bill-payment') {
            if (this.route.url !== '/offers') {
                this.route.navigate(['/myaccount/home']);
            }
        }
    }

    private handleError(error: any): void {
        this.laddaBtnService.stop();
        this.progressBar.emit(false);
        if (error.code === 404) {
            this.toastNotification.showToast(error.error, ToastNotificationColor.ERROR);
            return;
        }
        this.toastNotification.showToast('Server Error!', ToastNotificationColor.ERROR);
        return;
    }
}
