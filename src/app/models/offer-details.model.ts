/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
export interface OfferDetails {
    SEOName: string;
    Instructions: string;
    OfferId: number;
    name: string;
    Description: string;
    payout_type: string;
    default_payout: number;
    percent_payout: number;
    IsHotOffer: boolean;
    DisplayOffer: boolean;
    IsAppInstall: boolean;
    IsOnLandingPage: boolean;
    pc_default_payout: number;
    pc_percent_payout: number;
    has_goals_enabled: boolean;
    require_approval: boolean;
    approval_Requested: boolean;
    got_approval: boolean;
    ItemCategory_IDs: number[];
    TrackingLink: string;
    vComm_Payout: number;
    pc_Payout: number;
    GoalCount: number;
    IsPostbackURLAdded: boolean;
    CategoryAdded: boolean;
    ImageUrl: string;
    expiration_date: Date;
    Coupon_Count: number;
    GoalDetails:any;
    LogoURL:string;
}
