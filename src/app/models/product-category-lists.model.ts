/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {ProductLists} from './product-lists.model';
import {Aggregations} from './aggregation.model';
export interface ProductCategoryLists {
    total: number;
    sourceItem: ProductLists[];
    aggs: Aggregations;
}
