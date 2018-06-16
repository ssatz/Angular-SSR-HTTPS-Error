import { RouterModule } from '@angular/router';
import { IndianCurrency } from './../pipes/indianCurrency.pipe';

import { ProductCarouselComponent } from './product-carousel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ProductCarouselComponent,
    IndianCurrency
  ],
  exports: [
    ProductCarouselComponent,
    IndianCurrency
  ],
  providers: []
})
export class ProductCarouselModule { }
