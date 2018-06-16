import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {PrivacyPolicyComponent} from './privacy-policy.component';


export const privacyPolicyRoutes: Routes = [
    {
        path: 'privacy-policy', component: PrivacyPolicyComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(privacyPolicyRoutes)],
    exports: [RouterModule]
})
export class PrivacyPolicyRoutingModule {

}