import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'noresult-cmp',
    templateUrl: './noresult.component.html',
    styles: [`.main-title {
  display: inline-flex;
  font-size: 3rem;
  font-weight: lighter;
  text-align: center;
}

.cog {
  width: 14rem;
  height: 14rem;
  fill: #A188AD;
  transition: easeInOutQuint();
  animation: CogAnimation 5s infinite;
  cursor: pointer;
}
@keyframes CogAnimation {
    0%   {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
}
.main-description {
  font-size: 1.2rem;
  font-weight: lighter;
  text-align: center;
}`]
})
export class NoResultComponent {
    @Input() searchQuery: Observable<string>;
}