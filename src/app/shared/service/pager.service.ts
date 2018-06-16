/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable()
export class PagerService {
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 6) {
        // calculate total pages
        const totalPages: number = Math.ceil(totalItems / pageSize);
        let maxPageToShow = 6;
        if (pageSize > 6) {
            maxPageToShow = 10;
        }
        // convert string to number
        currentPage = Number(currentPage);

        let startPage: number, endPage: number;
        if (totalPages <= maxPageToShow) {
            // less than 6 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 6 total pages so calculate start and end pages
            if (currentPage <= ((maxPageToShow / 2) + 1)) {
                startPage = 1;
                endPage = maxPageToShow;
            } else if (currentPage + ((maxPageToShow / 2) + 1) >= totalPages) {
                startPage = totalPages - (maxPageToShow - 1);
                endPage = totalPages;
            } else {
                startPage = currentPage - (maxPageToShow / 2);
                endPage = currentPage + (maxPageToShow / 3);
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = _.range(startPage, endPage + 1);
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}