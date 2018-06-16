import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductDetailsComponent } from './product-details.component';
import { ProductDetailsResolver } from './product-details.resolver';

export const productDetailsRoutes: Routes = [
    {
        path: ':slug', component: ProductDetailsComponent,
        resolve: {
            productDetails: ProductDetailsResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(productDetailsRoutes)],
    exports: [RouterModule]
})
export class ProductDetailsRoutingModule {

}
