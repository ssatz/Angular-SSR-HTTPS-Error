
import {never as observableNever, timer as observableTimer, Observable} from 'rxjs';

import {filter, tap, switchMap, map, take} from 'rxjs/operators';
export class CountDownTimerService {
    constructor(private timerElement:HTMLElement,
                private inputStream:Observable<boolean>,
                private duration:number=60000,
                private interval:number=1000){
    }

    private countdown( inputStream: Observable<boolean>,
               duration: number=60000,
               interval: number = 1000):Observable<number> {
        return this.inputStream.pipe(
            switchMap((enabled) => {
                return enabled ? observableTimer(0, interval).pipe(
                        take(duration / interval + 1)) :   //removed takeUntil as the canceled by switchMap,
                                                            // when trustworthy data is not emitted. Thanks to thatseeyou
                    observableNever();
            }),
            map((value:any) => duration - value * interval),);
    }

    showTimer (){
       return this.countdown(this.inputStream,this.duration,this.interval).pipe(
            tap((count) => this.renderCountdown(count / 1000)),
            filter((count) => count === 0),);
    }

   private renderCountdown(value){
       this.timerElement.textContent = value;
    }

}
