
import {pluck} from 'rxjs/operators';

/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */
import 'chart.js';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Earnings } from '../../models/earnings.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {isNullOrUndefined} from "util";
import {PagerService} from '../../shared/service/pager.service';
import {Observable} from "rxjs";
import {Transaction} from "../../models/transaction.model";
import {ActionItem} from "../../models/action-item.model";
declare let Chart:any;

@Component({
    selector: 'home-cmp',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    public earnings: Observable<Earnings>;
    public transactions:Observable<Transaction>;
    public actionItems:Observable<ActionItem>;
    public AmountPaid:any;
    public PaymentRequested:any;
    public BalancePayable:any;
    public totalNumber:number;
    pager: any;
    currentPage :number;
    @ViewChild('doughnutChart') donut: ElementRef;

    constructor(private route: ActivatedRoute,private pagerService: PagerService,private navigation: Router) {
        this.route.params.subscribe((params: Params) => {
            this.currentPage=  isNullOrUndefined(params['pager'])?1:params['pager'];
        });
    }

    ngOnInit() {
        this.earnings =  this.route.data.pipe(pluck('earnings'));
        this.transactions =  this.route.data.pipe(pluck('earnings','PurchaseList'));
        this.actionItems =  this.route.data.pipe(pluck('earnings','ActionItems'));

        this.earnings.subscribe((data)=>{
            this.AmountPaid = data.Paid;
            this.BalancePayable = data.BalancePayable;
            this.PaymentRequested = data.PaymentRequested;
            this.totalNumber = data.TotalTransactions;
        });
        let donutCtx = this.donut.nativeElement.getContext('2d');
        var data = {
            labels: [
                "Paid",
                "Payment Requested",
                "Balance Payable"
            ],
            datasets: [
                {
                    "data": [this.AmountPaid,this.PaymentRequested,this.BalancePayable],   //  data should be passed here
                    "backgroundColor": [
                        "#F7464A",
                        "#46BFBD",
                        "#FDB45C"
                    ]
                }]
        };

        var chart = new Chart(
            donutCtx,
            {
                "type": 'doughnut',
                "data": data,
                "options": {
                    responsive: true,
                    "cutoutPercentage": 50,
                    "animation": {
                        "animateScale": true,
                        "animateRotate": true
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.yLabel;
                            }
                        }
                    }
                }
            }
        );

        //Pagination info
        this.pager = this.pagerService.getPager(this.totalNumber, this.currentPage);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.totalNumber, page);
        this.navigation.navigateByUrl('myaccount/home/'+page);
        this.earnings =  this.route.data.pipe(pluck('earnings'));
        this.transactions =  this.route.data.pipe(pluck('earnings','PurchaseList'));
    }
}
