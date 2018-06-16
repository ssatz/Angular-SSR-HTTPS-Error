import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListsComponent } from './product-lists.component';
import { ProductListsResolver } from './product-lists.resolver';


export const productListsRoutes: Routes = [
    {
        path: ':slug/.', component: ProductListsComponent,
        resolve: {
            productLists: ProductListsResolver
        }
    },
    {
        path: ':slug/:pager', component: ProductListsComponent,
        resolve: {
            productLists: ProductListsResolver
        }
    },
    {
        path: ':slug/:filter/.', component: ProductListsComponent,
        resolve: {
            productLists: ProductListsResolver
        }
    },
    {
        path: ':slug/:filter/:pager', component: ProductListsComponent,
        resolve: {
            productLists: ProductListsResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(productListsRoutes)],
    exports: [RouterModule]
})
export class ProductListsRoutingModule {

}
