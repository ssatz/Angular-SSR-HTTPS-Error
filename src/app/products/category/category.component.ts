import { MobileDetectService } from './../../shared/service/mobile-detect.service';
import { Observable } from 'rxjs';
import { MegaMenu } from './../../models/menu.model';
import { ProductService } from './../../shared/service/product.service';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-category-cmp',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
    public menu: Observable<MegaMenu>;
    public isMobile = false;
    constructor(private category: ProductService,
        private router:Router,
        @Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit() {
        this.category.getMegaMenu().subscribe((menu: Observable<MegaMenu>) => {
            this.menu = menu;
        },
            (error) => {
                console.log('Menu Not Loaded :(');
            });

        if (isPlatformBrowser(this.platformId) && MobileDetectService.detectMobile()) {
            this.isMobile = true;
        }
    }

    categoryNav($event: any, slug: string) {
        $event.preventDefault();
        this.router.navigate([slug + '/.']);
    }


}
