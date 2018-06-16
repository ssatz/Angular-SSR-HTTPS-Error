
import { LoggingService } from './service/error-logging.service';
import { MobileDetectService } from './service/mobile-detect.service';
import { ServerErrorComponent } from './server-error/server-error.component';
import { FilterDropDownComponent } from './filter-dropdown/filter-dropdown.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeDirective, MaterializeModule } from 'angular2-materialize';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './sidebar/sidebar.component';
import { ValidationService } from './service/validation.service';
import { FormControlMessagesComponent } from './formcontrol-messages.component';
import { AuthenticationService } from './service/authentication.service';
import { AuthGuardService } from './service/authGuard.service';
import { SearchBoxComponent } from './search/search.component';
import { SearchConfigService } from './service/searchconfig.service';
import { OAuthHttpService } from './service/oAuth-http.service';
import { LocalStorageService } from './service/local-storage.service';
import { HttpModule } from '@angular/http';
import { UserService } from './service/user.service';
import { ShowAuthedDirective } from './directives/show-authed.directive';
import { NoAuthGuardService } from './service/noAuthGuard.service';
import { MyAccountService } from './service/my-account.service';
import { SocialLoginService } from './service/social-login.service';
import { SocialLoginComponent } from '../socialLogin/social-login.component';
import { OfferService } from './service/offer.service';
import { OfferPipeFilter } from './pipes/offer-filter.pipe';
import { ToastService } from './service/toast.service';
import { LanguageService } from './service/language.service';
import { PagerService } from './service/pager.service';
import { FormErrorsComponent } from './form-error.component';
import { ReferralService } from './service/referral.service';
import { SearchService } from './service/search.service';
import { SeoService } from './service/seo.service';
import { FAQService } from './service/faq.service';
import { LaddaButtonSpinnerService } from './service/LaddaButtonSpinnerService';
import { CeiboShare } from './directives/social-share/ng2-social-share';
import { RechargeBillServices } from './service/recharge-bill.service';
import { RechargeBillResolver } from '../recharge-bill/recharge-bill.resolver';
import { RightSideBarComponent } from './right-sidebar/right-sidebar.component';
import { CommonNotificationService } from './service/common-notification.service';
import { ModalComponent } from './modal/modal.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SortPipe } from './pipes/sort.pipe';
import { AppConfig, AppConfigServiceFactory } from './service/app-config.service';
import { PushNotificationService } from './service/push-notification.service';
import { ProductService } from './service/product.service';
import { KeysPipe, SpecKeysPipe, SplitPipe, FilterPipe } from './pipes/keys.pipe';
import { AggsFiltersComponent } from './aggs-filters/aggs-filters.component';
import { MegaMenuComponent } from './mega-menu/mega-menu.component';
import { NoResultComponent } from './noresult/noresult.component';
import { GlobalService } from './service/globals.service';
import { ScrollToTopComponent } from './scrollto-top/scrollto-top.component';
import { ServerResponseService } from './service/server-response.service';
import { ProductCarouselModule } from './product-carousel/product-carousel.module';


@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, MaterializeModule, ReactiveFormsModule, ProductCarouselModule],
    declarations: [HeaderComponent,
        FooterComponent,
        SideBarComponent,
        RightSideBarComponent,
        FormControlMessagesComponent,
        FormErrorsComponent,
        SearchBoxComponent,
        ShowAuthedDirective,
        SocialLoginComponent,
        OfferPipeFilter,
        SortPipe,
        ModalComponent,
        LogoutComponent,
        LoginModalComponent,
        KeysPipe,
        SpecKeysPipe,
        SplitPipe,
        FilterPipe,
        CeiboShare,
        AggsFiltersComponent,
        FilterDropDownComponent,
        MegaMenuComponent,
        NoResultComponent,
        ScrollToTopComponent,
        ServerErrorComponent
    ],
    providers: [
        OAuthHttpService,
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: AppConfigServiceFactory,
            deps: [AppConfig],
            multi: true
        },
        ValidationService,
        ToastService,
        LanguageService,
        AuthenticationService,
        SearchConfigService,
        ProductService,
        LocalStorageService,
        AuthGuardService,
        NoAuthGuardService,
        MyAccountService,
        SocialLoginService,
        ReferralService,
        UserService,
        SearchService,
        SeoService,
        PagerService,
        OfferService,
        LaddaButtonSpinnerService,
        RechargeBillServices,
        CommonNotificationService,
        RechargeBillResolver,
        PushNotificationService,
        ServerResponseService,
        GlobalService,
        MobileDetectService,
        LoggingService,
        FAQService],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterializeModule,
        ProductCarouselModule,
        HeaderComponent,
        FooterComponent,
        SideBarComponent,
        RightSideBarComponent,
        MaterializeDirective,
        FormControlMessagesComponent,
        FormErrorsComponent,
        SocialLoginComponent,
        SearchBoxComponent,
        HttpModule,
        ShowAuthedDirective,
        OfferPipeFilter,
        SortPipe,
        ModalComponent,
        LogoutComponent,
        LoginModalComponent,
        KeysPipe,
        SpecKeysPipe,
        SplitPipe,
        FilterPipe,
        CeiboShare,
        AggsFiltersComponent,
        FilterDropDownComponent,
        MegaMenuComponent,
        NoResultComponent,
        ScrollToTopComponent,
        ServerErrorComponent
    ],
})

export class SharedModule {
}


