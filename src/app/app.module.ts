import { GlobalService } from './shared/service/globals.service';
import { FAQService } from './shared/service/faq.service';
import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { FAQResolver } from './faq/faq.resolve';
import { FAQComponent } from './faq/faq.component';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule } from '@angular/common/http';
import { OAuthHttpService } from './shared/service/oAuth-http.service';


@NgModule({
    imports: [BrowserModule.withServerTransition({ appId: 'paisaclub-server' }),
        MaterializeModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserTransferStateModule
        // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    declarations: [
        AppComponent,
        FAQComponent,
        HomeComponent
    ],
    providers: [
        FAQService,
        FAQResolver,
        OAuthHttpService,
        GlobalService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
