
import {finalize} from 'rxjs/operators';
import { MobileDetectService } from './../../shared/service/mobile-detect.service';
import { isNullOrUndefined } from 'util';
import { Component, OnInit, ViewChild, Inject, Optional, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { ProductCategoryLists } from '../../models/product-category-lists.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SeoService } from '../../shared/service/seo.service';
import { ProductService } from '../../shared/service/product.service';
import { AggsFiltersComponent } from '../../shared/aggs-filters/aggs-filters.component';
import { PagerService } from '../../shared/service/pager.service';

import { DOCUMENT, isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'product-lists-comp',
    templateUrl: './product-lists.component.html',
    styles: [`
    .cd-main-content {
      position: relative;
      min-height: 100vh;
  }
  .cd-main-content:after {
      content: "";
      display: table;
      clear: both;
  }
  .cd-main-content.is-fixed .cd-tab-filter-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
  }
  .cd-main-content.is-fixed .cd-gallery {
      padding-top: 76px;
  }
  .cd-main-content.is-fixed .cd-filter {
      position: fixed;
      height: 100vh;
      overflow: hidden;
  }
  .cd-main-content.is-fixed .cd-filter form {
      height: 100vh;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
  }
  .cd-main-content.is-fixed .cd-filter-trigger {
      position: fixed;
  }
  @media only screen and (min-width: 768px) {
      .cd-main-content.is-fixed .cd-gallery {
          padding-top: 90px;
      }
  }
  @media only screen and (min-width: 1170px) {
      .cd-main-content.is-fixed .cd-gallery {
          padding-top: 100px;
      }
  }
  /* -------------------------------- 
    xtab-filter 
    -------------------------------- */
  .cd-tab-filter-wrapper {
      background-color: #ffffff;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
      z-index: 1;
  }
  .cd-tab-filter-wrapper:after {
      content: "";
      display: table;
      clear: both;
  }
  ::ng-deep .cd-tab-filter {
      /* tabbed navigation style on mobile - dropdown */
      position: relative;
      height: 50px;
      width: 140px;
      margin: 0 auto;
      z-index: 1;
  }
  ::ng-deep .cd-tab-filter::after {
      /* small arrow icon */
      content: '';
      position: absolute;
      right: 14px;
      top: 50%;
      bottom: auto;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url("../assets/app-images/cd-icon-arrow.svg") no-repeat center center;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      transition: all 0.3s;
      pointer-events: none;
  }
  ::ng-deep  .cd-tab-filter ul {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #ffffff;
      box-shadow: inset 0 -2px 0 #41307c;
  }
  ::ng-deep .cd-tab-filter li {
      display: none;
  }
  ::ng-deep .cd-tab-filter li:first-child {
      /* this way the placehodler is alway visible */
      display: block;
  }
  ::ng-deep .cd-tab-filter a {
      display: block;
      /* set same size of the .cd-tab-filter */
      height: 50px;
      width: 140px;
      line-height: 50px;
      padding-left: 14px;
  }
  ::ng-deep .cd-tab-filter a.selected {
      background: #41307c;
      color: #ffffff;
  }
  ::ng-deep .cd-tab-filter.is-open::after {
      /* small arrow rotation */
      -webkit-transform: translateY(-50%) rotate(-180deg);
      -moz-transform: translateY(-50%) rotate(-180deg);
      -ms-transform: translateY(-50%) rotate(-180deg);
      -o-transform: translateY(-50%) rotate(-180deg);
      transform: translateY(-50%) rotate(-180deg);
  }
  ::ng-deep .cd-tab-filter.is-open ul {
      box-shadow: inset 0 -2px 0 #41307c, 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  ::ng-deep .cd-tab-filter.is-open ul li {
      display: block;
  }
  ::ng-deep .cd-tab-filter.is-open .placeholder a {
      /* reduces the opacity of the placeholder on mobile when the menu is open */
      opacity: .4;
  }
  @media only screen and (min-width: 768px) {
    ::ng-deep .cd-tab-filter {
          /* tabbed navigation style on medium devices */
          width: auto;
          cursor: auto;
      }
      ::ng-deep .cd-tab-filter::after {
          /* hide the arrow */
          display: none;
      }
      ::ng-deep .cd-tab-filter ul {
          background: transparent;
          position: static;
          box-shadow: none;
          text-align: center;
      }
      ::ng-deep .cd-tab-filter li {
          display: inline-block;
      }
      ::ng-deep .cd-tab-filter li.placeholder {
          display: none !important;
      }
      ::ng-deep .cd-tab-filter a {
          display: inline-block;
          padding: 0 1em;
          width: auto;
          color: #9a9a9a;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 1rem;
      }
      ::ng-deep .no-touch .cd-tab-filter a:hover {
          color: #41307c;
      }
      ::ng-deep .cd-tab-filter a.selected {
          background: transparent;
          color: #41307c;
          /* create border bottom using box-shadow property */
          box-shadow: inset 0 -2px 0 #41307c;
      }
      ::ng-deep .cd-tab-filter.is-open ul li {
          display: inline-block;
      }
  }
  @media only screen and (min-width: 1170px) {
      .cd-tab-filter {
          /* tabbed navigation on big devices */
          width: 100%;
          float: right;
          margin: 0;
          -webkit-transition: width 0.3s;
          -moz-transition: width 0.3s;
          transition: width 0.3s;
      }
      .cd-tab-filter.filter-is-visible {
          /* reduce width when filter is visible */
          width: 80%;
      }
      .cd-gallery{
          min-height:3500px;
      }
  }
  /* -------------------------------- 
    
    xfilter 
    
    -------------------------------- */
    ::ng-deep .cd-filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 280px;
      height: 100%;
      background: #ffffff;
      /* box-shadow: 4px 4px 20px transparent; */
      z-index: 2;
      /* Force Hardware Acceleration in WebKit */
      -webkit-transform: translateZ(0);
      -moz-transform: translateZ(0);
      -ms-transform: translateZ(0);
      -o-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-transform: translateX(-100%);
      -moz-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
      -o-transform: translateX(-100%);
      transform: translateX(-100%);
      -webkit-transition: -webkit-transform 0.3s, box-shadow 0.3s;
      -moz-transition: -moz-transform 0.3s, box-shadow 0.3s;
      transition: transform 0.3s, box-shadow 0.3s;
  }
  ::ng-deep .cd-filters {
      margin: 0px !important;
  }
  ::ng-deep .cd-filter::before {
      /* top colored bar */
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 50px;
      width: 100%;
      background-color: #41307c;
      z-index: 2;
  }
  ::ng-deep .cd-filter form {
      padding: 70px 20px;
  }
  ::ng-deep .cd-filter .cd-close {
      position: absolute;
      top: 0;
      right: 0;
      height: 50px;
      line-height: 50px;
      width: 60px;
      color: #ffffff;
      font-size: 1.3rem;
      text-align: center;
      background: #37296a;
      opacity: 0;
      -webkit-transition: opacity 0.3s;
      -moz-transition: opacity 0.3s;
      transition: opacity 0.3s;
      z-index: 3;
  }
  ::ng-deep .no-touch .cd-filter .cd-close:hover {
      background: #32255f;
  }
  ::ng-deep .cd-filter.filter-is-visible {
      -webkit-transform: translateX(0);
      -moz-transform: translateX(0);
      -ms-transform: translateX(0);
      -o-transform: translateX(0);
      transform: translateX(0);
  }
  ::ng-deep .cd-filter.filter-is-visible .cd-close {
      opacity: 1;
  }
  ::ng-deep  @media only screen and (min-width: 1170px) {
    ::ng-deep  .cd-filter {
          width: 20.5%;
      }
  }
  .cd-filter-trigger {
      position: absolute;
      top: 0;
      left: 0;
      height: 50px;
      line-height: 50px;
      width: 60px;
      /* image replacement */
      overflow: hidden;
      text-indent: 100%;
      color: transparent;
      white-space: nowrap;
      background: transparent url("../assets/app-images/cd-icon-filter.svg") no-repeat center center;
      z-index: 3;
  }
  .cd-filter-trigger.filter-is-visible {
      pointer-events: none;
  }
  @media only screen and (min-width: 1170px) {
      .cd-filter-trigger {
          width: auto;
          left: 2%;
          text-indent: 0;
          color: #9a9a9a;
          text-transform: uppercase;
          font-size: 1rem;
          font-weight: 700;
          padding-left: 24px;
          background-position: left center;
          -webkit-transition: color 0.3s;
          -moz-transition: color 0.3s;
          transition: color 0.3s;
      }
      .no-touch .cd-filter-trigger:hover {
          color: #41307c;
      }
      .cd-filter-trigger.filter-is-visible,
      .cd-filter-trigger.filter-is-visible:hover {
          color: #ffffff;
      }
  }
  @-moz-document url-prefix() {
      /* hide custom arrow on Firefox - select element */
      .cd-filter-block .cd-select::after {
          display: none;
      }
  }
  .card-product .card-content {
      padding: 0px !important;
      text-align: center !important;
  }
  .collection-product {
      border: none !important;
  }
  .offer-count {
      color: lightgray !important;
  }
  .product-image {
      max-height: 120px !important;
  }
  .product-highlights
  {
      max-height: 140px !important;
      min-height: 140px !important;;
      overflow: hidden !important;;
  }
  .product-highlights>ul {
      text-align: left !important;
      font-size: small !important;
      min-height: 100px !important;
  }
  .no-border-bottom {
      border-bottom: none !important;
  }
  .product-price {
      font-weight: bold !important;
      font-size: small !important;
  }
  .row-card-transactions {
      background-color: white !important;
      margin-bottom: 0px !important;
  }
  .info {
      display: inline-block;
      margin-left: 10px;
      color: #878787;
      font-size: 12px;
  }
  .pointer {
      cursor: pointer;
  }
  .heading {
      font-weight: 500;
      font-size: 16px;
      margin-top: 8px;
      display: inline-block;
  }
  @font-face {
      font-family: 'rupee';
      src: url('rupee_foradian-1-webfont.eot');
      src: local('Ã¢ËœÂº'), url(data:font/truetype;charset=utf-8;base64,AAEAAAANAIAAAwBQRkZUTVen5G0AAADcAAAAHEdERUYAQAAEAAAA+AAAACBPUy8yRQixzQAAARgAAABgY21hcGmyCE0AAAF4AAABamdhc3D//wADAAAC5AAAAAhnbHlmmuFTtAAAAuwAABAoaGVhZPOmAG0AABMUAAAANmhoZWELSAQOAAATTAAAACRobXR4KSwAAAAAE3AAAABMbG9jYUCgSLQAABO8AAAAKG1heHAAFQP+AAAT5AAAACBuYW1lWObwcQAAFAQAAAIDcG9zdCuGzNQAABYIAAAAuAAAAAEAAAAAxtQumQAAAADIadrpAAAAAMhp2uoAAQAAAA4AAAAYAAAAAAACAAEAAQASAAEABAAAAAIAAAADAigBkAAFAAgFmgUzAAABGwWaBTMAAAPRAGYCEgAAAgAFAAAAAAAAAIAAAKdQAABKAAAAAAAAAABITCAgAEAAICBfBZr+ZgDNBrQBoiAAARFBAAAAAAAFnAAAACAAAQAAAAMAAAADAAAAHAABAAAAAABkAAMAAQAAABwABABIAAAADgAIAAIABgAgAFIAoCAKIC8gX///AAAAIABSAKAgACAvIF/////j/7L/ZeAG3+LfswABAAAAAAAAAAAAAAAAAAAAAAEGAAABAAAAAAAAAAECAAAAAgAAAAAAAAAAAAAAAAAAAAEAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//8AAgABAAAAAAO0BZwD/QAAATMVMzUhFTMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVIxUjNSMVIzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNSE1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1ITUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNSECTBAYATwEBAQEBAQEBAQEBAQEBAQEBAQEBAQQ2AQEBAQEBAQEBAQEBAQEBAT0BAQEBAQEBAQEBAQEBAQEBAQEBAQECJwEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgEBAQECAQECAQIBAgECAgECAwICAgMCAwMEAwQFBAcHBAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBIAcMAwEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEsCAcEBAMDAwICAgICAgECAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAT9/AQEBAQEBAQEBAQEBAQEBAQEBAQECAGYBAQEBAQEBAQEBAQEBAgECAQIBAwICAwIEBAYFCjwBAQEBAQEBAQEBAQEBAQEBAQEBAQECAH0BZwEBAQIBAgIBAgECAQIBAgIBAgECAQIBAQEDAgECAQIBAgECAwICAwQEAQEBAgECAQICAQIBAgECAgECAQICAQEBAgQEBAMDAgIDAQICAQICAQEBAgEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBBAECAQEBAgEBAgEBAQECAQECAQEBAgEBAQIBAQIBAQEBAQIBAgEBAgEBAQIBAQECAQEBAgEBAQIBAQEBAQIBAQIBAQECAQEBAgEBAgEBAQEBAgEBAgEBAgEBAQEBAgEBAgEBAQECAQECAQEBAgEBAQECAQECAQECAQEBAQIBAQEBAgEBAQEBAQECAQEBAQIBAQECAQEBAgEBAQIBAQECAQECAQEBAgECAQEBAgEBAQIBAQIBAQEBAgEBAgEBAgEBAQECAQECAQEBAQIBAQECAQECAQEBAQIBAQIBAQEBAQIBAQECAQEBAgEBAgEBAQEBAQIBAQECAQEBAQIBAQECAQEBAQEBAgIeAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAQECAQICAgIDAwIHBQMCAQICAQIBAgECAQICAQIBAgEBAQEDAgIBAgEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgECAQIBAgECAQIBAgECAQICAQEBAQAAAAAAQAAAAADtAWcA/0AAAEzFTM1IRUzFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUjFSMVIxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFTMVMxUzFSMVIzUjFSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUhNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNSE1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUjNSM1IzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUhAkwQGAE8BAQEBAQEBAQEBAQEBAQEBAQEBAQEENgEBAQEBAQEBAQEBAQEBAQE9AQEBAQEBAQEBAQEBAQEBAQEBAQEBAicBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIBAQEBAgEBAgECAQIBAgIBAgMCAgIDAgMDBAMEBQQHBwQBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBASAHDAMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBLAgHBAQDAwMCAgICAgIBAgECAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE/fwEBAQEBAQEBAQEBAQEBAQEBAQEBAgBmAQEBAQEBAQEBAQEBAQIBAgECAQMCAgMCBAQGBQo8AQEBAQEBAQEBAQEBAQEBAQEBAQEBAgB9AWcBAQECAQICAQIBAgECAQICAQIBAgECAQEBAwIBAgECAQIBAgMCAgMEBAEBAQIBAgECAgECAQIBAgIBAgECAgEBAQIEBAQDAwICAwECAgECAgEBAQIBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQQBAgEBAQIBAQIBAQEBAgEBAgEBAQIBAQECAQECAQEBAQECAQIBAQIBAQECAQEBAgEBAQIBAQECAQEBAQECAQECAQEBAgEBAQIBAQIBAQEBAQIBAQIBAQIBAQEBAQIBAQIBAQEBAgEBAgEBAQIBAQEBAgEBAgEBAgEBAQECAQEBAQIBAQEBAQEBAgEBAQECAQEBAgEBAQIBAQECAQEBAgEBAgEBAQIBAgEBAQIBAQECAQECAQEBAQIBAQIBAQIBAQEBAgEBAgEBAQECAQEBAgEBAgEBAQECAQECAQEBAQECAQEBAgEBAQIBAQIBAQEBAQECAQEBAgEBAQECAQEBAgEBAQEBAQICHgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgEBAgECAgICAwMCBwUDAgECAgECAQIBAgECAgECAQIBAQEBAwICAQIBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIBAgECAQIBAgECAQIBAgECAgEBAQEAAAAAAEAAAABAACTKPMBXw889QALCAAAAAAAyGna6gAAAADIadrqAAAAAAO0BZwAAAAIAAIAAAAAAAAAAQAABrT+XgDeBZwAAAAAA7QAAQAAAAAAAAAAAAAAAAAAABMD9gAAAAAAAAKqAAAB/AAAA/YAAAH8AAACzgAABZwAAALOAAAFnAAAAd4AAAFnAAAA7wAAAO8AAACzAAABHwAAAE8AAAEfAAABZwAAAAAECgQKBAoECggUCBQIFAgUCBQIFAgUCBQIFAgUCBQIFAgUCBQIFAABAAAAEwP+AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgB+AAEAAAAAABMABQAAAAMAAQQJAAAAaAAFAAMAAQQJAAEACgBtAAMAAQQJAAIADgB3AAMAAQQJAAMADgCFAAMAAQQJAAQAGgCTAAMAAQQJAAUAVgCtAAMAAQQJAAYACgEDAAMAAQQJABMACgENAAMAAQQJAMgAbgEXUnVwZWUAVAB5AHAAZQBmAGEAYwBlACAAqQAgACgAeQBvAHUAcgAgAGMAbwBtAHAAYQBuAHkAKQAuACAAMgAwADEAMAAuACAAQQBsAGwAIABSAGkAZwBoAHQAcwAgAFIAZQBzAGUAcgB2AGUAZABSAHUAcABlAGUAUgBlAGcAdQBsAGEAcgB3AGUAYgBmAG8AbgB0AFIAdQBwAGUAZQAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwADAAIABKAHUAbAB5ACAAMQA1ACwAIAAyADAAMQAwACwAIABpAG4AaQB0AGkAYQBsACAAcgBlAGwAZQBhAHMAZQBSAHUAcABlAGUAUgB1AHAAZQBlAFQAaABpAHMAIABmAG8AbgB0ACAAdwBhAHMAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHQAaABlACAARgBvAG4AdAAgAFMAcQB1AGkAcgByAGUAbAAgAEcAZQBuAGUAcgBhAHQAbwByAC4AAAIAAAAAAAD/JwCWAAAAAAAAAAAAAAAAAAAAAAAAAAAAEwAAAAEAAgADADUBAgEDAQQBBQEGAQcBCAEJAQoBCwEMAQ0BDgEPB3VuaTAwQTAHdW5pMjAwMAd1bmkyMDAxB3VuaTIwMDIHdW5pMjAwMwd1bmkyMDA0B3VuaTIwMDUHdW5pMjAwNgd1bmkyMDA3B3VuaTIwMDgHdW5pMjAwOQd1bmkyMDBBB3VuaTIwMkYHdW5pMjA1Rg==) format('truetype');
      font-weight: normal;
      font-style: normal;
  }
  .mdi-rupee-symbol:before {
      font-family: rupee;
      content: "R";
  }
  .padding-10 {
      margin: 10px !important;
  }
  .full-width {
      width: 98% !important;
  }
  .offer-card li {
      text-align: center !important;
  }
  .row-filter {
      padding: 10px !important;
  }
  .product-listing-filter li {
      padding: 5px 15px !important;
      line-height: 30px !important;
  }
  .price-filter-li {
      padding: 0px 15px 5px 15px !important;
  }
  .row-no-margin-bottom {
      margin-bottom: 0px !important;
  }
  @media only screen and (max-width: 500px) {
      .margin-10 {
          padding: 10px !important;
      }
      .header-line-height {
          line-height: 40px !important;
      }
  }
  .product-title {
    font-weight: bold !important;
    font-size: small !important;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .width-trans-full {
      width: 100%;
      float: right;
      -webkit-transform: translateX(0);
      -moz-transform: translateX(0);
      -ms-transform: translateX(0);
      -o-transform: translateX(0);
      transform: translateX(0);
  }
  .width-trans {
      width: 80%;
      float: right;
      -webkit-transform: translateX(0);
      -moz-transform: translateX(0);
      -ms-transform: translateX(0);
      -o-transform: translateX(0);
      transform: translateX(0);
  }
  .chips-filter,#filter-chips{
    border: 1px solid #dfe1e8 !important;
    border-radius: 3px !important;
    background-color: #fff !important;
  }
  .chips-filter:hover{
    border: none;
    border-radius: 3px !important;
    background-color: #36465b !important;
    color:#f9fafd !important;
    text-decoration: line-through;
  }
  .chips-btn{
      color:#36465b;
      border: 1px solid #dfe1e8;
      border-radius: 3px;
      background-color: #fff ;
  }
  .chips-btn:hover{
    border: none;
    background-color: #36465b;
    color:#f9fafd;
}
`]
})

export class ProductListsComponent implements OnInit, AfterViewInit {
    productCategoryListsVM: ProductCategoryLists;
    public chipsSet: Array<any>;
    @ViewChild('aggsFilter') aggsFilter: AggsFiltersComponent;
    public totalNumber: number;
    pager: any;
    currentPage: number;
    filter = true; // show side filter on desktop

    constructor(private activateRoute: ActivatedRoute,
        private seoService: SeoService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(DOCUMENT) private document: any,
        private pagerService: PagerService,
        private productService: ProductService) {

    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId) && MobileDetectService.detectMobile()) {
            setTimeout(() => {
                this.filter = false;
            }, 200);
        }
    }

    ngOnInit() {
        this.activateRoute.params.subscribe((params: Params) => {
            const $pager = isNullOrUndefined(params['pager']) ? 1 : params['pager'];
            this.productCategoryListsVM = this.activateRoute.snapshot.data['productLists'];
            this.totalNumber = this.productCategoryListsVM.total;
            this.currentPage = $pager;
            this.pager = this.pagerService.getPager(this.totalNumber, this.currentPage, 36);
        });

        this.activateRoute.queryParams.subscribe((params: any) => {
            const chips: Array<any> = [];
            for (const chip in params) {
                if (chip !== 'psort') {
                    if (chip !== 'page') {
                        if (typeof params[chip] === 'string') {
                            chips[chip] = [params[chip]];
                        } else {
                            chips[chip] = params[chip];
                        }
                    }
                }
            }
            this.chipsSet = chips;
        });
    }

    filterSearch(filter: Array<any>): void {
        this.productService.getProductListByCategory(this.activateRoute.snapshot.params['slug'], this.aggsFilter.selectedFilters, 1).pipe(
            finalize(() => setTimeout(function () {
                this.aggsFilter.idSelection();
            }.bind(this), 1)))
            .subscribe((data: any) => {
                this.productCategoryListsVM = data;
                this.totalNumber = data.total;
                const pager$: number = this.activateRoute.snapshot.params['pager'];
                this.currentPage = isNullOrUndefined(pager$) ? 1 : pager$;
                this.pager = this.pagerService.getPager(this.totalNumber, this.currentPage, 36);
            },
                (error) => this.totalNumber = 0);
    }

    removeChips(e: any, key: any, value: any): void {
        e.preventDefault();
        const slug$: string = this.activateRoute.snapshot.params['slug'];
        let filter$: string = this.activateRoute.snapshot.params['filter'];
        filter$ = isNullOrUndefined(filter$) ? '' : '/' + filter$;
        if (this.aggsFilter.selectedFilters[key]) {
            const i = this.aggsFilter.selectedFilters[key].indexOf(value);
            this.aggsFilter.selectedFilters[key].splice(i, 1);
            for (const aggsKeys in this.aggsFilter.selectedFilters) {
                if (this.aggsFilter.selectedFilters[aggsKeys].length === 0) {
                    delete this.aggsFilter.selectedFilters[aggsKeys];
                } else {
                    this.aggsFilter.selectedFilters[aggsKeys] = this.aggsFilter.selectedFilters[aggsKeys].filter(Boolean);
                }
            }
            if (this.currentPage === 1) {
                this.filterSearch(this.aggsFilter.selectedFilters);
            }
            this.router.navigate([slug$ + filter$ + '/.'], {
                queryParams: this.aggsFilter.selectedFilters
            });
        }
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.totalNumber, page, 36);
        const slug$: string = this.activateRoute.snapshot.params['slug'];
        let filter$: string = this.activateRoute.snapshot.params['filter'];
        filter$ = isNullOrUndefined(filter$) ? '' : '/' + filter$;
        this.router.navigate([slug$ + filter$ + '/' + page], {
            queryParams: this.aggsFilter.selectedFilters,
            queryParamsHandling: 'merge'

        });
    }
    toggleClass($event) {
        $event.preventDefault();
        this.filter = !this.filter;
    }

    clearFilter() {
        this.aggsFilter.selectedFilters = [];
        const slug$: string = this.activateRoute.snapshot.params['slug'];
        let filter$: string = this.activateRoute.snapshot.params['filter'];
        filter$ = isNullOrUndefined(filter$) ? '' : '/' + filter$;
        if (this.currentPage === 1) {
            this.filterSearch(this.aggsFilter.selectedFilters);
        }
        this.router.navigate([slug$ + filter$ + '/.'], {
            queryParams: this.aggsFilter.selectedFilters
        });
    }
}
