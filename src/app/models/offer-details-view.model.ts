import {OfferDetails} from '../models/offer-details.model';
import {CouponDetails} from '../models/coupon-details.model';
import {Slider} from './slider.model';
export interface OfferDetailsViewModel
{
    offerInfo:OfferDetails,
    couponDetails:CouponDetails[],
    termsAndConditions:string,
    sliders:Slider[]
}