import { Routes } from '@angular/router';
import { ShopRedirectComponent } from './shop-redirect.component';
import { ShopRedirectResolver } from './shop-redirect.resolver';
import { ProductRedirectResolver } from './product-redirect.resolver';
export const shopRedirectRoutes: Routes = [
    {
        path: 'shop/:storeSlug', component: ShopRedirectComponent,
        resolve: {
            shop: ShopRedirectResolver
        }
    },
    {
        path: 'product/:storeSlug', component: ShopRedirectComponent,
        resolve: {
            shop: ProductRedirectResolver
        }
    }
];
