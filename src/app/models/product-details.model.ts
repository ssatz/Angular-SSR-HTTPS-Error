/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import {ProductStores} from './product-stores.model';
import {ProductBrand} from './product-brand.model';
import {ProductCategory} from './product-category.model';
export interface ProductDetails{
    id:number;
    paisaclub_id:number;
    description:string;
    name:string;
    keyspec:string;
    imageurl:string;
    slug:string;
    stores:ProductStores[],
    specifications:any,
    brand:ProductBrand,
    category:ProductCategory,
    product:any,
    spec:any

}
