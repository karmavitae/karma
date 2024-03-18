import { Route } from "@angular/router";
import { KvpComponent } from "./kvp/kvp.component";
import { KvpProfileComponent } from "./kvp-profile/kvp-profile.component";
import { inject } from "@angular/core";
import { KvpService } from "./services/kvp.service";
import { KvpPostInboxComponent } from "./kvp-post-inbox/kvp-post-inbox.component";
import { KvpPostSentComponent } from "./kvp-post-sent/kvp-post-sent.component";
import { KvpNetworkComponent } from "./kvp-network/kvp-network.component";
import { KvpAreanaComponent } from "./kvp-areana/kvp-areana.component";

export const KvpRoutes: Route[] = [
    { path: 'profile', component: KvpProfileComponent, 
        resolve: {
        profile: ()=>inject(KvpService).getKv()
        },
    },
    { path: 'networks', component: KvpNetworkComponent},
    { path: 'posts', component: KvpPostInboxComponent},
    { path: 'arena', component: KvpAreanaComponent},
    { path: 'requests', component: KvpPostSentComponent},    
    { path: '', component: KvpComponent},
    { path: '**', component: KvpComponent},
]