
import {pluck} from 'rxjs/operators';
import { ProductCarouselOptions } from './../shared/product-carousel/product-carousel.options';
import { ProductCategoryLists } from './../models/product-category-lists.model';
import { IProductCarousel } from './../shared/product-carousel/product.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable ,  Subscription } from 'rxjs';
import { OfferDetails } from '../models/offer-details.model';
import { CouponDetails } from '../models/coupon-details.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/service/user.service';
import { ToastService, ToastNotificationColor } from '../shared/service/toast.service';
import { SeoService } from '../shared/service/seo.service';
import { Slider } from '../models/slider.model';
import { CommonNotificationService } from '../shared/service/common-notification.service';
import { AuthenticationService } from '../shared/service/authentication.service';
import { Social } from '../models/social.model';


@Component({
    selector: 'landing-cmp',
    templateUrl: './landingpage.component.html',
    styles: ['.min-height{min-height: 74px} .slideShow{height:280px}']

})

export class LandingPageComponent implements OnDestroy, OnInit {
    public landingPageOffers: Observable<OfferDetails[]>;
    public couponDetails: Observable<CouponDetails[]>;
    public sliderDetails: Observable<Slider[]>;
    public socialCount: Social;
    private subscription: Subscription = new Subscription();
    public imageSliderUrls: Array<object> = [];
    public latestProductTitle: string;
    public latestProductCarousel: Array<IProductCarousel>;
    public latestProductCssClass: string;
    public latestMobileCarousel: Array<IProductCarousel>;
    public latestMobileTitle: string;
    public latestMobileCssClass: string;
    latestProductCarouselOptions: ProductCarouselOptions = {
        selector: '.latest-prod',
        duration: 800,
        easing: 'cubic-bezier(0.420, 0.000, 0.580, 1.000)',
        perPage: 6
    };
    latestMobileCarouselOptions: ProductCarouselOptions = {
        selector: '.latest-mobile',
        duration: 800,
        easing: 'cubic-bezier(0.420, 0.000, 0.580, 1.000)',
        perPage: 6
    };
    constructor(private seoService: SeoService,
        private router: Router,
        private authService: AuthenticationService,
        private notifyService: CommonNotificationService,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastService,
        private userService: UserService) {
        const landingPageDetails = this.activatedRoute.data.pipe(pluck('landingPage'));
        this.landingPageOffers = landingPageDetails.pipe(pluck('offers', 'data'));
        this.couponDetails = landingPageDetails.pipe(pluck('coupons'));
        this.sliderDetails = landingPageDetails.pipe(pluck('sliders'));
        landingPageDetails.pipe(pluck('products')).subscribe((product: any) => {
            this.latestProductCarousel = product.all;
            this.latestProductTitle = 'Latest Products';
            this.latestProductCssClass = 'latest-prod';
            this.latestMobileCarousel = product.mobile;
            this.latestMobileTitle = 'Latest Mobiles';
            this.latestMobileCssClass = 'latest-mobile';
        });
        landingPageDetails.pipe(pluck('social')).subscribe((data: Social) => {
            this.socialCount = data;
        });

        this.seoService.setTitle('Paisaclub.com - Earn & Spend Money, Mobile Recharge!');
    }
    ngOnInit() {

        this.sliderDetails.subscribe((slider: any) => {
            for (const slides of slider) {
                this.imageSliderUrls.push({
                    image: slides['sliderImageUrl'],
                    href: slides['redirectLink'],
                    alt: slides['offerName']
                });
            }
        });
        this.imageSliderUrls.push(
            { image: 'https://s3-ap-southeast-1.amazonaws.com/paisaclub-sliders/1.png', href: '/offers', alt: 'offers' },
            { image: 'https://s3-ap-southeast-1.amazonaws.com/paisaclub-sliders/2.png', href: '/offers', alt: 'offers' }
        );
    }

    emailSubscription(form: NgForm) {
        if (form.submitted && form.valid && !form.errors) {
            this.userService.emailSubscription(form.value).subscribe((data) => {
                if (data) {
                    this.toastService.showToast('<i class="small material-icons">info_outline</i>Thanks for Subscribe our Newsletter',
                        ToastNotificationColor.INFO);
                    form.reset();
                }
            });
        }
    }

    login($event: any): void {
        $event.preventDefault();
        this.notifyService.notifyOther({ option: 'login', value: 'open', event: $event, register: true });
    }

    referralLink($event: any): void {
        $event.preventDefault();
        this.subscription = this.authService.isAuthenticated.subscribe((auth: boolean) => {
            if (auth) {
                this.router.navigate(['/myaccount/referral']);
                return;
            }
            this.notifyService.notifyOther({ option: 'login', value: 'open', event: $event, register: false });
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}


