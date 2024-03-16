import { Routes } from '@angular/router';
import { KloginComponent } from './reception/klogin/klogin.component';
import { KjoinComponent } from './reception/kjoin/kjoin.component';
import { KlobbyComponent } from './reception/klobby/klobby.component';
import { KcontactComponent } from './reception/kcontact/kcontact.component';

export const routes: Routes = [
    { path: 'login', component: KloginComponent},
    { path: 'contact', component: KcontactComponent },
    { path: 'join', component: KjoinComponent },
    { path: '**', component: KlobbyComponent}
];
