/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import { ServerErrorComponent } from './shared/server-error/server-error.component';
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { loginRoutes } from './login/login.route';
import { landingPageRoutes } from './landingPage/landingpage.route';
import { registerRoutes } from './register/register.route';
import { forgotPasswordRoutes } from './forgotpassword/forgotpassword.route';
import { offersListRoutes } from './offerslists/offersList.route';
import { myAccountRoutes } from './myaccount.routing';
import { PreloadSelectedModules } from './selective-preload-strategy';
import { pageNotFoundRoutes } from './pageNotFound/page-not-found.routes';
import { offerDetailsRoutes } from './offerDetails/offer-details.route';
import { resetPasswordRoutes } from './resetpassword/reset-password.route';
import { FAQRoutes } from './faq/faq.route';
import { rechargeBillRoutes } from './recharge-bill/recharge-bill.routes';
import { shopRedirectRoutes } from './shop-redirect/shop-redirect.route';
import { productsRoutes } from './products.routing';
import { searchRoutes } from './search/search.route';
import { pagesRoutes } from './pages.routing';
export const routes: Routes = [{
    path: '', redirectTo: '/', pathMatch: 'full'
},
{ path: '404-page-not-found', component: PageNotFoundComponent },
{ path: '500-error', component: ServerErrorComponent },
...searchRoutes,
...landingPageRoutes,
...loginRoutes,
...registerRoutes,
...forgotPasswordRoutes,
...offersListRoutes,
...offerDetailsRoutes,
...myAccountRoutes,
...resetPasswordRoutes,
...FAQRoutes,
...rechargeBillRoutes,
...shopRedirectRoutes,
...pagesRoutes,
...productsRoutes,
...pageNotFoundRoutes,
];

@NgModule({
    imports: [RouterModule.forRoot(routes,
        { useHash: false, initialNavigation: 'enabled' })
    ],
    exports: [RouterModule],
    providers: [PreloadSelectedModules]
})
export class AppRoutingModule {
}

