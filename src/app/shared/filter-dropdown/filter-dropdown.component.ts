import { CommonNotificationService } from './../service/common-notification.service';
import { SortFilter } from './../../enum/sort-filter.enum';
import { Component, ChangeDetectionStrategy, OnInit, Renderer2, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EnumValues } from 'enum-values';

@Component({
    selector: 'app-filter-dropdown',
    templateUrl: './filter-dropdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FilterDropDownComponent implements OnInit {
    public filter = true;
    public sortFilter = SortFilter;
    // @Output() sortSelected: EventEmitter<SortFilter> = new EventEmitter<SortFilter>();
    constructor(private render: Renderer2,
        private notificationService: CommonNotificationService,
        @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit() {

    }
    dropdown($event) {
        $event.preventDefault();
        const sort_filter$ = $event.target.text;
        const class_name$ = $event.target.className;
        if (class_name$ === 'place-holder') {
            this.render.addClass(this.document.getElementsByClassName('cd-tab-filter')[0] as HTMLElement, 'is-open');
        } else if (class_name$ === 'selected') {
            this.document.getElementsByClassName('place-holder')[0].innerText = sort_filter$;
        } else {
            this.document.getElementsByClassName('place-holder')[0].innerText = sort_filter$;
            this.render.removeClass(this.document.getElementsByClassName('selected')[0] as HTMLElement, 'selected');
            this.render.removeClass(this.document.getElementsByClassName('cd-tab-filter')[0] as HTMLElement, 'is-open');
            this.render.addClass($event.target as HTMLElement, 'selected');
        }
        this.notificationService.notifyOther({ action: 'filter', value: EnumValues.getNameFromValue(SortFilter, sort_filter$) });
    }
}
