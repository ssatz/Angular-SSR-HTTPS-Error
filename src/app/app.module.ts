import { SlideshowModule } from './shared/slideshow/slideshow.module';
import { ProductRedirectResolver } from './shop-redirect/product-redirect.resolver';
import { GlobalErrorHandler } from './shared/service/global-error.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landingPage/landingpage.component';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { OffersListsComponent } from './offerslists/offersLists.component';
import { MyAccountModule } from './myaccount/myaccount.module';
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { OfferListResolver } from './offerslists/offersList.resolver';
import { OfferDetailsComponent } from './offerDetails/offer-details.component';
import { OfferDetailsResolver } from './offerDetails/offer-details.resolver';
import { ResetPasswordComponent } from './resetpassword/reset-password.component';
import { LandingPageResolver } from './landingPage/landingpage.resolver';
import { FAQResolver } from './faq/faq.resolve';
import { FAQComponent } from './faq/faq.component';
import { MaterializeModule } from 'angular2-materialize';
import { RechargeBillComponent } from './recharge-bill/reharge-bill.component';
import { ShopRedirectComponent } from './shop-redirect/shop-redirect.component';
import { ShopRedirectResolver } from './shop-redirect/shop-redirect.resolver';
import { ProductsModule } from './products/products.module';
import { SearchComponent } from './search/search.component';
import { SearchResolver } from './search/search.resolver';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/service/auth-interceptor.service';


@NgModule({
    imports: [BrowserModule.withServerTransition({ appId: 'paisaclub-server' }),
        MaterializeModule,
        SlideshowModule,
        AppRoutingModule,
        MyAccountModule,
        ProductsModule,
        PagesModule,
        HttpClientModule,
        BrowserTransferStateModule
        // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    declarations: [
        LoginComponent,
        AppComponent,
        LandingPageComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        OffersListsComponent,
        OfferDetailsComponent,
        FAQComponent,
        PageNotFoundComponent,
        RechargeBillComponent,
        ShopRedirectComponent,
        SearchComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        OfferListResolver,
        OfferDetailsResolver,
        LandingPageResolver,
        ShopRedirectResolver,
        ProductRedirectResolver,
        SearchResolver,
        FAQResolver,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }],
    bootstrap: [AppComponent],
    exports: [LoginComponent]
})

export class AppModule {
}
