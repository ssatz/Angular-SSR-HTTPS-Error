/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { CategoryComponent } from './category/category.component';
import { CategoryRoutingModule } from './category/category.routing';
import { ProductHomeRoutingModule } from './product-home/product-home.routing';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsRoutingModule } from './product-details/product-details.routing';
import { ProductDetailsResolver } from './product-details/product-details.resolver';
import { ProductListsComponent } from './product-lists/product-lists.component';
import { ProductListsRoutingModule } from './product-lists/product-lists.routing';
import { ProductListsResolver } from './product-lists/product-lists.resolver';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        CategoryRoutingModule,
        ProductHomeRoutingModule,
        ProductDetailsRoutingModule,
        ProductListsRoutingModule

    ],
    providers: [ProductDetailsResolver, ProductListsResolver],
    declarations: [
        CategoryComponent,
        ProductsComponent,
        ProductHomeComponent,
        ProductListsComponent,
        ProductDetailsComponent
    ],
    exports: [
        SharedModule,
        CategoryComponent,
        ProductsComponent,
        ProductHomeComponent,
        ProductListsComponent,
        ProductDetailsComponent,
        ReactiveFormsModule,
        FormsModule]
})

export class ProductsModule {
}
