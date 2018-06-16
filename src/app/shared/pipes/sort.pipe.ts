import { Pipe, PipeTransform} from '@angular/core';

@Pipe({name: "sortBy"})
export class SortPipe {
    public field1:any;
    public field2:any;
    transform(array: any[], field: string, fieldType:string, order:string): Array<any> {

        if(array != null) {
            array.sort((a: any, b: any) => {

                let field1 = (fieldType === "number")? Number(a[field]):a[field];
                let field2 = (fieldType === "number")? Number(b[field]):b[field];
                if(order === "dsc") //for descending order
                {
                    if (field1 > field2) {
                        return -1;
                    } else if (field1 < field2) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                else {
                    if (field1 < field2) {
                        return -1;
                    } else if (field1 > field2) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            });
        }
        return array;
    }
}