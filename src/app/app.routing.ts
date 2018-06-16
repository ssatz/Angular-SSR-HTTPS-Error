import { FAQComponent } from './faq/faq.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FAQRoutes } from './faq/faq.route';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    ...FAQRoutes
];

@NgModule({
    imports: [RouterModule.forRoot(routes,
        { useHash: false, initialNavigation: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

