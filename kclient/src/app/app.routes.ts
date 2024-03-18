import { Routes } from '@angular/router';
import { KloginComponent } from './reception/klogin/klogin.component';
import { KjoinComponent } from './reception/kjoin/kjoin.component';
import { KlobbyComponent } from './reception/klobby/klobby.component';
import { KcontactComponent } from './reception/kcontact/kcontact.component';
import { KvrInfoComponent } from './shared/information/kvr-info/kvr-info.component';
import { KvpInfoComponent } from './shared/information/kvp-info/kvp-info.component';
import { InformationService } from './shared/services/information.service';
import { inject } from '@angular/core';
import { KaboutComponent } from './shared/information/kabout/kabout.component';
import { KactivateComponent } from './reception/kactivate/kactivate.component';
import { KresetComponent } from './reception/kreset/kreset.component';
import { AuthGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
    { path: 'reset/:id/:**', component: KresetComponent},
    // { path: 'activate/:id/:**', component: KactivateComponent},
    // { path: 'activate/:id/:id/:**', component: KactivateComponent},
    { path: 'login', component: KloginComponent},
    { path: 'activate', component: KactivateComponent},
    { path: 'contact', component: KcontactComponent },
    { path: 'join', component: KjoinComponent },
    { path: 'rinfo', component: KvrInfoComponent, resolve: {
        article: ()=>inject(InformationService).getArticle('kvr')
    } },
    { path: 'about', component: KaboutComponent, resolve: {
        article: ()=>inject(InformationService).getArticle('about')
    } },
    { path: 'pinfo', component: KvpInfoComponent, resolve: {
        article: ()=>inject(InformationService).getArticle('kvp')
    } },
    { path: 'kvp',
    canActivate: [AuthGuard], 
    loadChildren: ()=> import('./kvp/kvp.routes').then(mod => mod.KvpRoutes)},
    { path: 'kvr', 
    canActivate: [AuthGuard],
    loadChildren: ()=> import('./kvr/kvr.routes').then(mod => mod.KvrRoutes)},
    { path: 'kve',
    canActivate: [AuthGuard], 
    loadChildren: ()=> import('./kve/kve.routes').then(mod => mod.KveRoutes)},
    { path: 'kva',
    canActivate: [AuthGuard], 
    loadChildren: ()=> import('./kva/kva.routes').then(mod => mod.KvaRoutes)},
    { path: '**', component: KlobbyComponent},
];
