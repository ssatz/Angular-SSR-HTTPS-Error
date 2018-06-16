/*
 * *
 *  *  * Copyright (C) glowjobs.in - All Rights Reserved
 *  *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  *  * Proprietary and confidential
 *  *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *  *
 *
 */

import { Router } from '@angular/router';
import { MenuChildren } from './../../models/menu-children.model';
import { Observable } from 'rxjs';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../service/product.service';
import { MegaMenu } from '../../models/menu.model';
import { MenuItem } from '../../models/menu-item.model';


@Component({
    selector: 'app-sg-megamenu',
    templateUrl: './mega-menu.component.html',
    styleUrls: ['./mega-menu.component.scss']
})

export class MegaMenuComponent implements OnInit {
    public menu: Observable<MegaMenu>;
    constructor(private megaMenu: ProductService,
        private render: Renderer2,
        private router: Router) { }
    ngOnInit() {
        this.megaMenu.getMegaMenu().subscribe((menu: Observable<MegaMenu>) => {
            this.menu = menu;
        },
            (error) => {
                console.log('Menu Not Loaded :(');
            });
    }

    navigate(event: Event, children: MenuChildren, menuItem: MenuItem) {
        event.preventDefault();
        const element$: any = (event.srcElement).closest('.z-depth-2');
        this.render.setStyle(element$, 'opacity', 0);
        this.router.navigate([children.slug + '/' + menuItem.q + '/.']);
    }
    categoryNav(event: Event, slug: string) {
        event.preventDefault();
        const element$: any = (event.srcElement).closest('.z-depth-2');
        this.render.setStyle(element$, 'opacity', 0);
        this.router.navigate([slug + '/.']);
    }

    mouseHover(event: Event) {
        let targetElement$: HTMLElement = event.currentTarget as HTMLElement;
        targetElement$ = targetElement$.querySelector('div.z-depth-2') as HTMLElement;
        this.render.setStyle(targetElement$, 'opacity', 1);
    }
}
