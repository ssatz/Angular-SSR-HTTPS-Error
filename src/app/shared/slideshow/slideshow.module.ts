import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowComponent } from './slideshow.component';
import { SwipeService } from './swipe.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SlideshowComponent
  ],
  exports: [
    SlideshowComponent
  ],
  providers: [
    SwipeService
  ]
})
export class SlideshowModule { }
