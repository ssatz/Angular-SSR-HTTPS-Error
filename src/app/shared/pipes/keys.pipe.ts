/*
 *  Copyright (C) Paisaclub.com - All Rights Reserved
 *  * Unauthorized copying of this file, via any medium is strictly prohibited
 *  * Proprietary and confidential
 *  * Written by Sathish Kumar(satz) <sathish.thi@gmail.com>
 *
 */

import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name: 'Speckeys'})
export class SpecKeysPipe implements PipeTransform {
    transform(value, args: string[]): any {
        let speckeys = [];
        for (let i = 0; i < value.length; i++) {
            for (let key in value[i]) {
                speckeys.push({key: key, value: value[i][key]});
            }
        }
        return speckeys;
    }
}


@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(value, args: string[]): any {
        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}

@Pipe({name: 'split'})
export class SplitPipe implements PipeTransform {
    transform(value, args: string[]): any {
        let keys = [];
        keys = value.split(',');
        return keys;
    }
}

@Pipe({
    name: 'filteraggs'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it['key'].toLowerCase().includes(searchText);
        });
    }
}